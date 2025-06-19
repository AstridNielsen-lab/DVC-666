// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title Devil's Coin 666 (DVC666)
 * @dev ERC20 Token with Staking, Presale, and Governance features
 * Total Supply: 66,666,666 DVC666
 * Decimals: 18
 * Block Time: 13 seconds (managed by consensus layer)
 * Features: Presale, Staking (6.66% APY), Auto-listing on MetaMask
 */
contract DevilsCoin is ERC20, ERC20Burnable, Pausable, Ownable, ReentrancyGuard {
    uint256 public constant TOTAL_SUPPLY = 66_666_666 * 10**18;
    uint256 public constant PRESALE_SUPPLY = 13_333_333 * 10**18; // 20% for presale
    uint256 public constant STAKING_REWARDS = 20_000_000 * 10**18; // 30% for staking rewards
    uint256 public constant TEAM_RESERVE = 6_666_666 * 10**18; // 10% for team
    uint256 public constant LIQUIDITY_POOL = 26_666_667 * 10**18; // 40% for liquidity
    
    uint256 public presalePrice = 0.00010382 ether; // Price in ETH (0.00010382 ETH per DVC666)
    uint256 public presaleCap = PRESALE_SUPPLY;
    uint256 public presaleSold = 0;
    bool public presaleActive = true; // Start presale immediately
    uint256 public minimumPurchase = 0.001 ether; // Minimum purchase 0.001 ETH
    uint256 public maximumPurchase = 10 ether; // Maximum purchase 10 ETH per transaction
    
    // Staking variables
    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public stakingTimestamp;
    mapping(address => uint256) public rewards;
    uint256 public totalStaked = 0;
    uint256 public stakingAPY = 666; // 6.66% APY (basis points)
    uint256 public constant STAKING_DURATION = 30 days;
    
    // Events
    event TokensPurchased(address indexed buyer, uint256 amount, uint256 cost);
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event PresaleStarted();
    event PresaleEnded();
    
    constructor() ERC20("DVC666 Coin", "DVC666") {
        // Mint initial supply to contract owner for distribution
        _mint(msg.sender, TEAM_RESERVE);
        _mint(address(this), PRESALE_SUPPLY + STAKING_REWARDS + LIQUIDITY_POOL);
        
        // Auto-start presale for immediate token sales
        presaleActive = true;
        emit PresaleStarted();
    }
    
    // Presale functions
    function startPresale() external onlyOwner {
        presaleActive = true;
        emit PresaleStarted();
    }
    
    function endPresale() external onlyOwner {
        presaleActive = false;
        emit PresaleEnded();
    }
    
    function buyTokens() external payable nonReentrant {
        require(presaleActive, "Presale is not active");
        require(msg.value >= minimumPurchase, "Purchase amount too low");
        require(msg.value <= maximumPurchase, "Purchase amount too high");
        
        uint256 tokenAmount = (msg.value * 10**18) / presalePrice;
        require(presaleSold + tokenAmount <= presaleCap, "Exceeds presale cap");
        
        presaleSold += tokenAmount;
        _transfer(address(this), msg.sender, tokenAmount);
        
        emit TokensPurchased(msg.sender, tokenAmount, msg.value);
    }
    
    // Quick buy function with automatic amount calculation
    function quickBuy() external payable nonReentrant {
        require(presaleActive, "Presale is not active");
        require(msg.value >= minimumPurchase, "Purchase amount too low");
        require(msg.value <= maximumPurchase, "Purchase amount too high");
        
        uint256 tokenAmount = (msg.value * 10**18) / presalePrice;
        require(presaleSold + tokenAmount <= presaleCap, "Exceeds presale cap");
        
        presaleSold += tokenAmount;
        _transfer(address(this), msg.sender, tokenAmount);
        
        emit TokensPurchased(msg.sender, tokenAmount, msg.value);
    }
    
    // Get token amount for ETH input
    function getTokenAmount(uint256 ethAmount) external view returns (uint256) {
        return (ethAmount * 10**18) / presalePrice;
    }
    
    // Get ETH cost for token amount
    function getETHCost(uint256 tokenAmount) external view returns (uint256) {
        return (tokenAmount * presalePrice) / 10**18;
    }
    
    function setPresalePrice(uint256 _newPrice) external onlyOwner {
        presalePrice = _newPrice;
    }
    
    // Staking functions
    function stake(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Cannot stake 0 tokens");
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");
        
        // Claim pending rewards before staking more
        if (stakedBalance[msg.sender] > 0) {
            claimRewards();
        }
        
        _transfer(msg.sender, address(this), _amount);
        stakedBalance[msg.sender] += _amount;
        stakingTimestamp[msg.sender] = block.timestamp;
        totalStaked += _amount;
        
        emit Staked(msg.sender, _amount);
    }
    
    function unstake(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Cannot unstake 0 tokens");
        require(stakedBalance[msg.sender] >= _amount, "Insufficient staked balance");
        require(block.timestamp >= stakingTimestamp[msg.sender] + STAKING_DURATION, "Staking period not completed");
        
        // Claim rewards before unstaking
        claimRewards();
        
        stakedBalance[msg.sender] -= _amount;
        totalStaked -= _amount;
        _transfer(address(this), msg.sender, _amount);
        
        emit Unstaked(msg.sender, _amount);
    }
    
    function calculateRewards(address _user) public view returns (uint256) {
        if (stakedBalance[_user] == 0) return 0;
        
        uint256 stakingTime = block.timestamp - stakingTimestamp[_user];
        uint256 rewardRate = (stakingAPY * stakedBalance[_user]) / 10000; // APY in basis points
        return (rewardRate * stakingTime) / 365 days;
    }
    
    function claimRewards() public nonReentrant {
        uint256 reward = calculateRewards(msg.sender);
        if (reward > 0) {
            rewards[msg.sender] = 0;
            stakingTimestamp[msg.sender] = block.timestamp;
            _transfer(address(this), msg.sender, reward);
            emit RewardsClaimed(msg.sender, reward);
        }
    }
    
    function getStakingInfo(address _user) external view returns (
        uint256 staked,
        uint256 pendingRewards,
        uint256 stakingTime,
        uint256 unlockTime
    ) {
        staked = stakedBalance[_user];
        pendingRewards = calculateRewards(_user);
        stakingTime = stakingTimestamp[_user];
        unlockTime = stakingTimestamp[_user] + STAKING_DURATION;
    }
    
    // Admin functions
    function withdrawETH() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    function setStakingAPY(uint256 _newAPY) external onlyOwner {
        stakingAPY = _newAPY;
    }
    
    function pause() public onlyOwner {
        _pause();
    }
    
    function unpause() public onlyOwner {
        _unpause();
    }
    
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
    
    // Emergency functions
    function emergencyWithdraw() external onlyOwner {
        _transfer(address(this), owner(), balanceOf(address(this)));
    }
    
    // View functions
    function getContractBalance() external view returns (uint256) {
        return balanceOf(address(this));
    }
    
    function getPresaleInfo() external view returns (
        uint256 price,
        uint256 sold,
        uint256 remaining,
        bool active
    ) {
        return (presalePrice, presaleSold, presaleCap - presaleSold, presaleActive);
    }
    
    // Additional presale view functions
    function getPresaleProgress() external view returns (uint256) {
        return (presaleSold * 100) / presaleCap;
    }
    
    function getMinMaxPurchase() external view returns (uint256 min, uint256 max) {
        return (minimumPurchase, maximumPurchase);
    }
    
    function setMinMaxPurchase(uint256 _min, uint256 _max) external onlyOwner {
        minimumPurchase = _min;
        maximumPurchase = _max;
    }
}

