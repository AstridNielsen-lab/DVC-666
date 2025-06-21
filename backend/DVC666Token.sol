// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IDVC666Token.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title DVC666Token
 * @dev Implementation of the DVC666 token contract
 * This token represents the main DVC666 Coin that will be purchased during presale
 */
contract DVC666Token is IDVC666Token, Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    
    string private _name = "DVC666 Coin";
    string private _symbol = "DVC";
    uint8 private _decimals = 18;
    uint256 private _totalSupply;
    
    // Initial supply of 1,000,000 tokens
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10**18;
    
    // Address that has permission to mint new tokens
    address private _presaleContract;
    
    // Mapping of account balances
    mapping(address => uint256) private _balances;
    
    // Mapping of allowances
    mapping(address => mapping(address => uint256)) private _allowances;
    
    // Flag to indicate if the token is paused
    bool private _paused;
    
    /**
     * @dev Modifier to check if the token is not paused
     */
    modifier whenNotPaused() {
        require(!_paused, "DVC666Token: token is paused");
        _;
    }
    
    /**
     * @dev Constructor to initialize the token with the initial supply
     */
    constructor() {
        // Mint the initial supply to the contract creator
        _mint(msg.sender, INITIAL_SUPPLY);
    }
    
    /**
     * @dev Sets the presale contract address
     * @param presaleContract The address of the presale contract
     */
    function setPresaleContract(address presaleContract) external onlyOwner {
        _presaleContract = presaleContract;
    }
    
    /**
     * @dev Pauses token transfers
     */
    function pause() external onlyOwner {
        _paused = true;
    }
    
    /**
     * @dev Unpauses token transfers
     */
    function unpause() external onlyOwner {
        _paused = false;
    }
    
    /**
     * @dev Returns the name of the token
     */
    function name() public view override returns (string memory) {
        return _name;
    }
    
    /**
     * @dev Returns the symbol of the token
     */
    function symbol() public view override returns (string memory) {
        return _symbol;
    }
    
    /**
     * @dev Returns the decimals of the token
     */
    function decimals() public view override returns (uint8) {
        return _decimals;
    }
    
    /**
     * @dev Returns the total supply of the token
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
    
    /**
     * @dev Returns the token balance of the specified account
     * @param account The address to query the balance of
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
    
    /**
     * @dev Transfers tokens from the caller to the recipient
     * @param recipient The address to transfer tokens to
     * @param amount The amount of tokens to transfer
     * @return A boolean indicating whether the operation succeeded
     */
    function transfer(address recipient, uint256 amount) public whenNotPaused override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }
    
    /**
     * @dev Returns the remaining allowance that the spender has to spend on behalf of the owner
     * @param owner The address that owns the tokens
     * @param spender The address that can spend the tokens
     */
    function allowance(address owner, address spender) public view override returns (uint256) {
        return _allowances[owner][spender];
    }
    
    /**
     * @dev Sets the amount of tokens that the spender can spend on behalf of the owner
     * @param spender The address that can spend the tokens
     * @param amount The amount of tokens that can be spent
     * @return A boolean indicating whether the operation succeeded
     */
    function approve(address spender, uint256 amount) public whenNotPaused override returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }
    
    /**
     * @dev Transfers tokens from the sender to the recipient using the allowance mechanism
     * @param sender The address to transfer tokens from
     * @param recipient The address to transfer tokens to
     * @param amount The amount of tokens to transfer
     * @return A boolean indicating whether the operation succeeded
     */
    function transferFrom(address sender, address recipient, uint256 amount) public whenNotPaused override returns (bool) {
        _transfer(sender, recipient, amount);
        
        uint256 currentAllowance = _allowances[sender][msg.sender];
        require(currentAllowance >= amount, "DVC666Token: transfer amount exceeds allowance");
        unchecked {
            _approve(sender, msg.sender, currentAllowance - amount);
        }
        
        return true;
    }
    
    /**
     * @dev Creates new tokens and assigns them to the specified account
     * @param to The address to mint tokens to
     * @param amount The amount of tokens to mint
     * @return A boolean indicating whether the operation succeeded
     */
    function mint(address to, uint256 amount) public override returns (bool) {
        require(msg.sender == owner() || msg.sender == _presaleContract, "DVC666Token: caller is not authorized to mint");
        _mint(to, amount);
        return true;
    }
    
    /**
     * @dev Internal function to transfer tokens from one account to another
     * @param sender The address to transfer tokens from
     * @param recipient The address to transfer tokens to
     * @param amount The amount of tokens to transfer
     */
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "DVC666Token: transfer from the zero address");
        require(recipient != address(0), "DVC666Token: transfer to the zero address");
        require(_balances[sender] >= amount, "DVC666Token: transfer amount exceeds balance");
        
        unchecked {
            _balances[sender] = _balances[sender].sub(amount);
            _balances[recipient] = _balances[recipient].add(amount);
        }
        
        emit Transfer(sender, recipient, amount);
    }
    
    /**
     * @dev Internal function to set an allowance
     * @param owner The address that owns the tokens
     * @param spender The address that can spend the tokens
     * @param amount The amount of tokens that can be spent
     */
    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "DVC666Token: approve from the zero address");
        require(spender != address(0), "DVC666Token: approve to the zero address");
        
        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
    
    /**
     * @dev Internal function to create new tokens and assign them to the specified account
     * @param account The address to mint tokens to
     * @param amount The amount of tokens to mint
     */
    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "DVC666Token: mint to the zero address");
        
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        
        emit Transfer(address(0), account, amount);
    }
    
    /**
     * @dev Internal function to destroy tokens from the specified account
     * @param account The address to burn tokens from
     * @param amount The amount of tokens to burn
     */
    function _burn(address account, uint256 amount) internal {
        require(account != address(0), "DVC666Token: burn from the zero address");
        require(_balances[account] >= amount, "DVC666Token: burn amount exceeds balance");
        
        unchecked {
            _balances[account] = _balances[account].sub(amount);
            _totalSupply = _totalSupply.sub(amount);
        }
        
        emit Transfer(account, address(0), amount);
    }
}
