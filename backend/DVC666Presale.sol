// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DVC666Token.sol";
import "./DVC666SubToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * @title DVC666Presale
 * @dev Contract for the presale of DVC666 tokens with Fibonacci price scaling
 */
contract DVC666Presale is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    
    // DVC666 token contract
    DVC666Token public dvc666Token;
    
    // Array of sub-token contracts
    DVC666SubToken[9] public subTokens;
    
    // Array of Chainlink price feed contracts for BTC variations
    AggregatorV3Interface[9] public btcPriceFeeds;
    
    // Base token price in ETH (0.00010382 ETH)
    uint256 public constant BASE_TOKEN_PRICE = 10382 * 10**10; // In wei
    
    // Fibonacci multiplier (1.618 with 3 decimal precision)
    uint256 public constant FIBONACCI_MULTIPLIER = 1618; // Multiply by 1000 for precision
    
    // Tokens per lot
    uint256 public constant TOKENS_PER_LOT = 1000 * 10**18;
    
    // Current price of the token
    uint256 public currentTokenPrice;
    
    // Current lot number
    uint256 public currentLot;
    
    // Tokens sold in the current lot
    uint256 public tokensSoldInCurrentLot;
    
    // Total tokens sold
    uint256 public totalTokensSold;
    
    // Sale active flag
    bool public saleActive;
    
    // Mapping to track purchases
    mapping(address => uint256) public purchases;
    
    // Events
    event TokenPurchased(address indexed buyer, uint256 amount, uint256 price);
    event PriceUpdated(uint256 oldPrice, uint256 newPrice, uint256 lot);
    event SubTokensDistributed(address indexed recipient, uint256 mainAmount, uint256[9] subAmounts);
    event SaleStatusChanged(bool active);
    event FundsWithdrawn(address indexed recipient, uint256 amount);
    
    /**
     * @dev Constructor to initialize the presale contract
     * @param _dvc666TokenAddress Address of the DVC666 token contract
     * @param _subTokenAddresses Array of addresses for the 9 sub-token contracts
     * @param _btcPriceFeedAddresses Array of addresses for the BTC price feed contracts
     */
    constructor(
        address _dvc666TokenAddress,
        address[9] memory _subTokenAddresses,
        address[9] memory _btcPriceFeedAddresses
    ) {
        dvc666Token = DVC666Token(_dvc666TokenAddress);
        
        // Initialize sub-tokens
        for (uint8 i = 0; i < 9; i++) {
            subTokens[i] = DVC666SubToken(_subTokenAddresses[i]);
        }
        
        // Initialize BTC price feeds
        for (uint8 i = 0; i < 9; i++) {
            btcPriceFeeds[i] = AggregatorV3Interface(_btcPriceFeedAddresses[i]);
        }
        
        currentTokenPrice = BASE_TOKEN_PRICE;
        currentLot = 1;
        tokensSoldInCurrentLot = 0;
        totalTokensSold = 0;
        saleActive = false;
    }
    
    /**
     * @dev Fallback function to handle ETH transfers
     */
    receive() external payable {
        buyToken();
    }
    
    /**
     * @dev Function to activate the sale
     */
    function activateSale() external onlyOwner {
        saleActive = true;
        emit SaleStatusChanged(true);
    }
    
    /**
     * @dev Function to pause the sale
     */
    function pauseSale() external onlyOwner {
        saleActive = false;
        emit SaleStatusChanged(false);
    }
    
    /**
     * @dev Function to buy tokens
     */
    function buyToken() public payable nonReentrant {
        require(saleActive, "DVC666Presale: sale is not active");
        require(msg.value > 0, "DVC666Presale: amount must be greater than 0");
        
        // Calculate the amount of tokens to be purchased
        uint256 highestBtcPrice = getHighestBtcPrice();
        uint256 tokenAmount = msg.value.mul(10**18).div(currentTokenPrice);
        
        // Check if the lot needs to be updated
        if (tokensSoldInCurrentLot.add(tokenAmount) > TOKENS_PER_LOT) {
            // Calculate how many tokens remain in the current lot
            uint256 remainingInLot = TOKENS_PER_LOT.sub(tokensSoldInCurrentLot);
            
            // Calculate the cost of the remaining tokens in the current lot
            uint256 costForRemaining = remainingInLot.mul(currentTokenPrice).div(10**18);
            
            // Update the current lot and price
            updateLotAndPrice();
            
            // Calculate how many tokens can be purchased with the remaining ETH in the next lot
            uint256 remainingEth = msg.value.sub(costForRemaining);
            uint256 tokensInNextLot = remainingEth.mul(10**18).div(currentTokenPrice);
            
            // Update the token amount to be the sum of the remaining tokens in the current lot and the tokens in the next lot
            tokenAmount = remainingInLot.add(tokensInNextLot);
        }
        
        // Update the tokens sold
        tokensSoldInCurrentLot = tokensSoldInCurrentLot.add(tokenAmount);
        totalTokensSold = totalTokensSold.add(tokenAmount);
        
        // Update the user's purchase record
        purchases[msg.sender] = purchases[msg.sender].add(tokenAmount);
        
        // Transfer the tokens to the buyer
        require(dvc666Token.mint(msg.sender, tokenAmount), "DVC666Presale: token minting failed");
        
        // Distribute the sub-tokens
        disperseTokens(msg.sender, tokenAmount);
        
        emit TokenPurchased(msg.sender, tokenAmount, currentTokenPrice);
    }
    
    /**
     * @dev Function to update the lot and price
     */
    function updateLotAndPrice() internal {
        uint256 oldPrice = currentTokenPrice;
        
        // Update the lot number
        currentLot = currentLot.add(1);
        
        // Update the price using Fibonacci scaling
        currentTokenPrice = currentTokenPrice.mul(FIBONACCI_MULTIPLIER).div(1000);
        
        // Reset the tokens sold in the current lot
        tokensSoldInCurrentLot = 0;
        
        emit PriceUpdated(oldPrice, currentTokenPrice, currentLot);
    }
    
    /**
     * @dev Function to disperse tokens into 9 sub-tokens
     * @param recipient The address to receive the sub-tokens
     * @param amount The amount of main tokens to disperse
     */
    function disperseTokens(address recipient, uint256 amount) internal {
        // Calculate the sub-token amount (divided by 9)
        uint256 subTokenAmount = amount.div(9);
        
        // Array to store individual sub-token amounts
        uint256[9] memory subAmounts;
        
        // Mint sub-tokens to the recipient
        for (uint8 i = 0; i < 9; i++) {
            subAmounts[i] = subTokenAmount;
            require(subTokens[i].mint(recipient, subTokenAmount), "DVC666Presale: sub-token minting failed");
        }
        
        emit SubTokensDistributed(recipient, amount, subAmounts);
    }
    
    /**
     * @dev Function to get the current token price
     * @return The current price of the token
     */
    function getCurrentPrice() external view returns (uint256) {
        return currentTokenPrice;
    }
    
    /**
     * @dev Function to get the highest BTC price among the 9 variations
     * @return The highest BTC price in USD (8 decimals)
     */
    function getHighestBtcPrice() public view returns (uint256) {
        uint256 highestPrice = 0;
        
        for (uint8 i = 0; i < 9; i++) {
            // Get the latest price from the Chainlink price feed
            (
                , 
                int256 price,
                ,
                ,
                
            ) = btcPriceFeeds[i].latestRoundData();
            
            if (price > 0 && uint256(price) > highestPrice) {
                highestPrice = uint256(price);
            }
        }
        
        // If all price feeds failed, use a fallback price
        if (highestPrice == 0) {
            // Fallback price (can be adjusted)
            highestPrice = 30000 * 10**8; // $30,000 with 8 decimals
        }
        
        return highestPrice;
    }
    
    /**
     * @dev Function to withdraw the funds from the contract
     */
    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "DVC666Presale: no funds to withdraw");
        
        // Transfer the funds to the owner
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "DVC666Presale: failed to withdraw funds");
        
        emit FundsWithdrawn(owner(), balance);
    }
    
    /**
     * @dev Function to update a BTC price feed
     * @param index The index of the price feed to update
     * @param newPriceFeed The address of the new price feed
     */
    function updateBtcPriceFeed(uint8 index, address newPriceFeed) external onlyOwner {
        require(index < 9, "DVC666Presale: index out of bounds");
        btcPriceFeeds[index] = AggregatorV3Interface(newPriceFeed);
    }
    
    /**
     * @dev Function to get the number of tokens that can be purchased with a given amount of ETH
     * @param ethAmount The amount of ETH in wei
     * @return The number of tokens that can be purchased
     */
    function getTokensForEth(uint256 ethAmount) external view returns (uint256) {
        return ethAmount.mul(10**18).div(currentTokenPrice);
    }
    
    /**
     * @dev Function to get the amount of ETH required to purchase a given number of tokens
     * @param tokenAmount The number of tokens to purchase
     * @return The amount of ETH required in wei
     */
    function getEthForTokens(uint256 tokenAmount) external view returns (uint256) {
        return tokenAmount.mul(currentTokenPrice).div(10**18);
    }
}
