// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title DVC666SubToken
 * @dev Implementation for the sub-tokens that represent fractions of the DVC666 Coin
 * Each sub-token corresponds to a different BTC variation
 */
contract DVC666SubToken is ERC20, Ownable, ReentrancyGuard {
    // Index of this sub-token (1-9)
    uint8 private _index;
    
    // Reference to the BTC variation this token represents (e.g., "WBTC", "BTCB", etc.)
    string private _btcVariation;
    
    // The presale contract address
    address private _presaleContract;
    
    /**
     * @dev Constructor to initialize the sub-token
     * @param name The name of the sub-token
     * @param symbol The symbol of the sub-token
     * @param index The index of this sub-token (1-9)
     * @param btcVariation The BTC variation this token represents
     */
    constructor(
        string memory name,
        string memory symbol,
        uint8 index,
        string memory btcVariation
    ) ERC20(name, symbol) {
        require(index >= 1 && index <= 9, "DVC666SubToken: index must be between 1 and 9");
        _index = index;
        _btcVariation = btcVariation;
    }
    
    /**
     * @dev Sets the presale contract address
     * @param presaleContract The address of the presale contract
     */
    function setPresaleContract(address presaleContract) external onlyOwner {
        _presaleContract = presaleContract;
    }
    
    /**
     * @dev Returns the index of this sub-token
     */
    function getIndex() external view returns (uint8) {
        return _index;
    }
    
    /**
     * @dev Returns the BTC variation this token represents
     */
    function getBtcVariation() external view returns (string memory) {
        return _btcVariation;
    }
    
    /**
     * @dev Creates new tokens and assigns them to the specified account
     * @param to The address to mint tokens to
     * @param amount The amount of tokens to mint
     */
    function mint(address to, uint256 amount) external nonReentrant returns (bool) {
        require(msg.sender == owner() || msg.sender == _presaleContract, "DVC666SubToken: caller is not authorized to mint");
        _mint(to, amount);
        return true;
    }
    
    /**
     * @dev Destroys tokens from the specified account
     * @param from The address to burn tokens from
     * @param amount The amount of tokens to burn
     */
    function burn(address from, uint256 amount) external nonReentrant returns (bool) {
        require(msg.sender == owner() || msg.sender == _presaleContract, "DVC666SubToken: caller is not authorized to burn");
        _burn(from, amount);
        return true;
    }
}
