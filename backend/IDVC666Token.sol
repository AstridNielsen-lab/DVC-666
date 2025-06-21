// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title IDVC666Token
 * @dev Interface for the DVC666 token contract
 */
interface IDVC666Token {
    /**
     * @dev Returns the name of the token
     */
    function name() external view returns (string memory);
    
    /**
     * @dev Returns the symbol of the token
     */
    function symbol() external view returns (string memory);
    
    /**
     * @dev Returns the decimals of the token
     */
    function decimals() external view returns (uint8);
    
    /**
     * @dev Returns the total supply of the token
     */
    function totalSupply() external view returns (uint256);
    
    /**
     * @dev Returns the token balance of the specified account
     * @param account The address to query the balance of
     */
    function balanceOf(address account) external view returns (uint256);
    
    /**
     * @dev Transfers tokens from the caller to the recipient
     * @param recipient The address to transfer tokens to
     * @param amount The amount of tokens to transfer
     * @return A boolean indicating whether the operation succeeded
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
    
    /**
     * @dev Returns the remaining allowance that the spender has to spend on behalf of the owner
     * @param owner The address that owns the tokens
     * @param spender The address that can spend the tokens
     */
    function allowance(address owner, address spender) external view returns (uint256);
    
    /**
     * @dev Sets the amount of tokens that the spender can spend on behalf of the owner
     * @param spender The address that can spend the tokens
     * @param amount The amount of tokens that can be spent
     * @return A boolean indicating whether the operation succeeded
     */
    function approve(address spender, uint256 amount) external returns (bool);
    
    /**
     * @dev Transfers tokens from the sender to the recipient using the allowance mechanism
     * @param sender The address to transfer tokens from
     * @param recipient The address to transfer tokens to
     * @param amount The amount of tokens to transfer
     * @return A boolean indicating whether the operation succeeded
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    
    /**
     * @dev Creates new tokens and assigns them to the specified account
     * @param to The address to mint tokens to
     * @param amount The amount of tokens to mint
     * @return A boolean indicating whether the operation succeeded
     */
    function mint(address to, uint256 amount) external returns (bool);
    
    /**
     * @dev Emitted when tokens are transferred from one account to another
     * @param from The address tokens were transferred from
     * @param to The address tokens were transferred to
     * @param value The amount of tokens transferred
     */
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    /**
     * @dev Emitted when an allowance is set
     * @param owner The address that owns the tokens
     * @param spender The address that can spend the tokens
     * @param value The amount of tokens that can be spent
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
