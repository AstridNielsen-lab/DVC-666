// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title DVC666 - Devil's Coin 666
 * @dev Advanced ERC20 token with presale, staking, and evolution mechanics
 * @author DVC666 Team
 */
contract DVC666 is ERC20, ERC20Burnable, Pausable, Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    // ========== CONSTANTS ==========
    uint256 public constant TOTAL_SUPPLY = 66_666_666 * 10**18; // 66,666,666 tokens
    uint256 public constant PRESALE_SUPPLY = 13_333_333 * 10**18; // 20% for presale
    uint256 public constant STAKING_REWARDS = 20_000_000 * 10**18; // 30% for staking
    uint256 public constant TEAM_RESERVE = 6_666_666 * 10**18; // 10% for team
    uint256 public constant LIQUIDITY_POOL = 26_666_667 * 10**18; // 40% for liquidity
    
    uint256 public constant PRESALE_PRICE = 10382000000000; // 0.00010382 ETH per token
    uint256 public constant MIN_PURCHASE = 0.001 ether;
    uint256 public constant MAX_PURCHASE = 10 ether;
    uint256 public constant STAKING_DURATION = 30 days;
    uint256 public constant STAKING_APY = 666; // 6.66% APY in basis points

    // ========== STATE VARIABLES ==========
    
    // Presale State
    bool public presaleActive;
    uint256 public presaleSold;
    uint256 public presaleStartTime;
    uint256 public presaleEndTime;
    mapping(address => uint256) public presalePurchases;
    
    // Staking State
    struct StakeInfo {
        uint256 amount;
        uint256 stakingTime;
        uint256 lastRewardTime;
        uint256 pendingRewards;
        bool active;
    }
    
    mapping(address => StakeInfo) public stakes;
    uint256 public totalStaked;
    uint256 public totalRewardsDistributed;
    
    // Evolution System
    uint256 public currentEvolution = 1;
    uint256 public nextEvolutionTime;
    mapping(uint256 => uint256) public evolutionBonuses;
    
    // Token Economics
    uint256 public burnedTokens;
    uint256 public marketCapTarget;
    
    // Security
    mapping(address => bool) public blacklisted;
    mapping(address => bool) public authorized;
    uint256 public maxTransactionAmount;
    uint256 public maxWalletAmount;
    bool public tradingEnabled;

    // ========== EVENTS ==========
    event TokensPurchased(address indexed buyer, uint256 amount, uint256 cost);
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event PresaleStarted(uint256 startTime, uint256 endTime);
    event PresaleEnded(uint256 totalSold);
    event EvolutionTriggered(uint256 evolution, uint256 bonus);
    event TokensBurned(uint256 amount);
    event TradingEnabled();
    event BlacklistUpdated(address indexed account, bool status);
    
    // ========== MODIFIERS ==========
    modifier onlyAuthorized() {
        require(authorized[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }
    
    modifier notBlacklisted(address account) {
        require(!blacklisted[account], "Address is blacklisted");
        _;
    }
    
    modifier presaleIsActive() {
        require(presaleActive, "Presale is not active");
        require(block.timestamp >= presaleStartTime && block.timestamp <= presaleEndTime, "Presale period invalid");
        _;
    }

    // ========== CONSTRUCTOR ==========
    constructor(address _owner) ERC20("Devil's Coin 666", "DVC666") {
        _transferOwnership(_owner);
        
        // Mint initial supply distribution
        _mint(_owner, TEAM_RESERVE);
        _mint(address(this), PRESALE_SUPPLY.add(STAKING_REWARDS));
        _mint(_owner, LIQUIDITY_POOL);
        
        // Initialize evolution system
        evolutionBonuses[1] = 100; // 1% bonus for evolution 1
        nextEvolutionTime = block.timestamp + 365 days / 9; // ~40 days per evolution
        
        // Set transaction limits
        maxTransactionAmount = TOTAL_SUPPLY.mul(1).div(100); // 1% of supply
        maxWalletAmount = TOTAL_SUPPLY.mul(2).div(100); // 2% of supply
        
        // Authorize owner
        authorized[_owner] = true;
    }

    // ========== PRESALE FUNCTIONS ==========
    
    /**
     * @dev Start the presale
     */
    function startPresale(uint256 _duration) external onlyOwner {
        require(!presaleActive, "Presale already active");
        require(_duration > 0, "Invalid duration");
        
        presaleActive = true;
        presaleStartTime = block.timestamp;
        presaleEndTime = block.timestamp.add(_duration);
        
        emit PresaleStarted(presaleStartTime, presaleEndTime);
    }
    
    /**
     * @dev End the presale
     */
    function endPresale() external onlyOwner {
        require(presaleActive, "Presale not active");
        
        presaleActive = false;
        emit PresaleEnded(presaleSold);
    }
    
    /**
     * @dev Buy tokens during presale
     */
    function buyTokens() external payable presaleIsActive nonReentrant notBlacklisted(msg.sender) {
        require(msg.value >= MIN_PURCHASE, "Below minimum purchase");
        require(msg.value <= MAX_PURCHASE, "Above maximum purchase");
        
        uint256 tokenAmount = getTokenAmount(msg.value);
        require(presaleSold.add(tokenAmount) <= PRESALE_SUPPLY, "Exceeds presale supply");
        
        presaleSold = presaleSold.add(tokenAmount);
        presalePurchases[msg.sender] = presalePurchases[msg.sender].add(tokenAmount);
        
        _transfer(address(this), msg.sender, tokenAmount);
        
        emit TokensPurchased(msg.sender, tokenAmount, msg.value);
    }
    
    /**
     * @dev Quick buy with current evolution bonus
     */
    function quickBuy() external payable presaleIsActive nonReentrant notBlacklisted(msg.sender) {
        require(msg.value >= MIN_PURCHASE, "Below minimum purchase");
        require(msg.value <= MAX_PURCHASE, "Above maximum purchase");
        
        uint256 baseTokenAmount = getTokenAmount(msg.value);
        uint256 bonus = baseTokenAmount.mul(evolutionBonuses[currentEvolution]).div(10000);
        uint256 totalTokenAmount = baseTokenAmount.add(bonus);
        
        require(presaleSold.add(totalTokenAmount) <= PRESALE_SUPPLY, "Exceeds presale supply");
        
        presaleSold = presaleSold.add(totalTokenAmount);
        presalePurchases[msg.sender] = presalePurchases[msg.sender].add(totalTokenAmount);
        
        _transfer(address(this), msg.sender, totalTokenAmount);
        
        emit TokensPurchased(msg.sender, totalTokenAmount, msg.value);
    }
    
    /**
     * @dev Calculate token amount for ETH
     */
    function getTokenAmount(uint256 ethAmount) public pure returns (uint256) {
        return ethAmount.mul(10**18).div(PRESALE_PRICE);
    }
    
    /**
     * @dev Calculate ETH cost for tokens
     */
    function getETHCost(uint256 tokenAmount) public pure returns (uint256) {
        return tokenAmount.mul(PRESALE_PRICE).div(10**18);
    }

    // ========== STAKING FUNCTIONS ==========
    
    /**
     * @dev Stake tokens for rewards
     */
    function stake(uint256 amount) external nonReentrant notBlacklisted(msg.sender) {
        require(amount > 0, "Cannot stake 0 tokens");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        // Update pending rewards before changing stake
        _updateRewards(msg.sender);
        
        StakeInfo storage userStake = stakes[msg.sender];
        
        if (userStake.active) {
            userStake.amount = userStake.amount.add(amount);
        } else {
            userStake.amount = amount;
            userStake.stakingTime = block.timestamp;
            userStake.active = true;
        }
        
        userStake.lastRewardTime = block.timestamp;
        totalStaked = totalStaked.add(amount);
        
        _transfer(msg.sender, address(this), amount);
        
        emit Staked(msg.sender, amount);
    }
    
    /**
     * @dev Unstake tokens
     */
    function unstake(uint256 amount) external nonReentrant {
        StakeInfo storage userStake = stakes[msg.sender];
        require(userStake.active, "No active stake");
        require(userStake.amount >= amount, "Insufficient staked amount");
        require(block.timestamp >= userStake.stakingTime.add(STAKING_DURATION), "Staking period not completed");
        
        // Update and claim pending rewards
        _updateRewards(msg.sender);
        if (userStake.pendingRewards > 0) {
            _claimRewards(msg.sender);
        }
        
        userStake.amount = userStake.amount.sub(amount);
        totalStaked = totalStaked.sub(amount);
        
        if (userStake.amount == 0) {
            userStake.active = false;
        }
        
        _transfer(address(this), msg.sender, amount);
        
        emit Unstaked(msg.sender, amount);
    }
    
    /**
     * @dev Claim staking rewards
     */
    function claimRewards() external nonReentrant {
        _updateRewards(msg.sender);
        _claimRewards(msg.sender);
    }
    
    /**
     * @dev Internal function to update rewards
     */
    function _updateRewards(address user) internal {
        StakeInfo storage userStake = stakes[user];
        if (!userStake.active || userStake.amount == 0) return;
        
        uint256 timeStaked = block.timestamp.sub(userStake.lastRewardTime);
        uint256 rewards = userStake.amount.mul(STAKING_APY).mul(timeStaked).div(365 days).div(10000);
        
        userStake.pendingRewards = userStake.pendingRewards.add(rewards);
        userStake.lastRewardTime = block.timestamp;
    }
    
    /**
     * @dev Internal function to claim rewards
     */
    function _claimRewards(address user) internal {
        StakeInfo storage userStake = stakes[user];
        require(userStake.pendingRewards > 0, "No rewards to claim");
        
        uint256 rewards = userStake.pendingRewards;
        userStake.pendingRewards = 0;
        totalRewardsDistributed = totalRewardsDistributed.add(rewards);
        
        _transfer(address(this), user, rewards);
        
        emit RewardsClaimed(user, rewards);
    }

    // ========== EVOLUTION SYSTEM ==========
    
    /**
     * @dev Trigger next evolution (manual for now, can be automated)
     */
    function triggerEvolution() external onlyAuthorized {
        require(block.timestamp >= nextEvolutionTime, "Evolution not ready");
        require(currentEvolution < 9, "Max evolution reached");
        
        currentEvolution++;
        evolutionBonuses[currentEvolution] = evolutionBonuses[currentEvolution - 1].add(50); // +0.5% each evolution
        nextEvolutionTime = block.timestamp.add(365 days / 9);
        
        emit EvolutionTriggered(currentEvolution, evolutionBonuses[currentEvolution]);
    }

    // ========== ADMIN FUNCTIONS ==========
    
    /**
     * @dev Enable trading
     */
    function enableTrading() external onlyOwner {
        tradingEnabled = true;
        emit TradingEnabled();
    }
    
    /**
     * @dev Set authorized address
     */
    function setAuthorized(address account, bool status) external onlyOwner {
        authorized[account] = status;
    }
    
    /**
     * @dev Update blacklist
     */
    function setBlacklist(address account, bool status) external onlyAuthorized {
        blacklisted[account] = status;
        emit BlacklistUpdated(account, status);
    }
    
    /**
     * @dev Withdraw ETH from contract
     */
    function withdrawETH() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        
        payable(owner()).transfer(balance);
    }
    
    /**
     * @dev Emergency pause
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Burn tokens to reduce supply
     */
    function burnSupply(uint256 amount) external onlyOwner {
        require(balanceOf(address(this)) >= amount, "Insufficient contract balance");
        
        _burn(address(this), amount);
        burnedTokens = burnedTokens.add(amount);
        
        emit TokensBurned(amount);
    }

    // ========== VIEW FUNCTIONS ==========
    
    /**
     * @dev Get presale information
     */
    function getPresaleInfo() external view returns (
        uint256 price,
        uint256 sold,
        uint256 remaining,
        bool active
    ) {
        return (
            PRESALE_PRICE,
            presaleSold,
            PRESALE_SUPPLY.sub(presaleSold),
            presaleActive && block.timestamp >= presaleStartTime && block.timestamp <= presaleEndTime
        );
    }
    
    /**
     * @dev Get presale progress
     */
    function getPresaleProgress() external view returns (uint256) {
        return presaleSold.mul(10000).div(PRESALE_SUPPLY); // Returns percentage in basis points
    }
    
    /**
     * @dev Get min/max purchase amounts
     */
    function getMinMaxPurchase() external pure returns (uint256 min, uint256 max) {
        return (MIN_PURCHASE, MAX_PURCHASE);
    }
    
    /**
     * @dev Get staking information for user
     */
    function getStakingInfo(address user) external view returns (
        uint256 staked,
        uint256 pendingRewards,
        uint256 stakingTime,
        uint256 unlockTime
    ) {
        StakeInfo memory userStake = stakes[user];
        
        uint256 pending = userStake.pendingRewards;
        if (userStake.active && userStake.amount > 0) {
            uint256 timeStaked = block.timestamp.sub(userStake.lastRewardTime);
            uint256 newRewards = userStake.amount.mul(STAKING_APY).mul(timeStaked).div(365 days).div(10000);
            pending = pending.add(newRewards);
        }
        
        return (
            userStake.amount,
            pending,
            userStake.stakingTime,
            userStake.stakingTime.add(STAKING_DURATION)
        );
    }
    
    /**
     * @dev Calculate current rewards for user
     */
    function calculateRewards(address user) external view returns (uint256) {
        StakeInfo memory userStake = stakes[user];
        if (!userStake.active || userStake.amount == 0) return userStake.pendingRewards;
        
        uint256 timeStaked = block.timestamp.sub(userStake.lastRewardTime);
        uint256 newRewards = userStake.amount.mul(STAKING_APY).mul(timeStaked).div(365 days).div(10000);
        
        return userStake.pendingRewards.add(newRewards);
    }
    
    /**
     * @dev Get contract balance
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // ========== OVERRIDES ==========
    
    /**
     * @dev Override transfer to add trading restrictions
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused notBlacklisted(from) notBlacklisted(to) {
        // Allow minting, burning, and contract operations
        if (from == address(0) || to == address(0) || from == address(this) || to == address(this)) {
            super._beforeTokenTransfer(from, to, amount);
            return;
        }
        
        // Check if trading is enabled for regular transfers
        require(tradingEnabled, "Trading not enabled yet");
        
        // Check transaction limits
        if (from != owner() && to != owner()) {
            require(amount <= maxTransactionAmount, "Exceeds max transaction amount");
            
            if (to != address(0)) {
                require(balanceOf(to).add(amount) <= maxWalletAmount, "Exceeds max wallet amount");
            }
        }
        
        super._beforeTokenTransfer(from, to, amount);
    }
    
    /**
     * @dev Receive ETH
     */
    receive() external payable {
        // Allow contract to receive ETH
    }
    
    /**
     * @dev Fallback function
     */
    fallback() external payable {
        revert("Function not found");
    }
}

