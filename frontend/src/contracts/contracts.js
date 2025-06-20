// contracts.js - Configuração centralizada dos contratos DVC666
// Endereços e ABIs para interação com contratos inteligentes

// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
  // Local Hardhat network
  1337: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  // Ethereum Mainnet (when deployed)
  1: process.env.REACT_APP_MAINNET_CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  // Sepolia Testnet (when deployed)
  11155111: process.env.REACT_APP_SEPOLIA_CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  // BSC Mainnet (when deployed)
  56: process.env.REACT_APP_BSC_CONTRACT_ADDRESS || null,
  // Polygon Mainnet (when deployed)
  137: process.env.REACT_APP_POLYGON_CONTRACT_ADDRESS || null
};

// Flag to enable demo mode (for testing without deployed contract)
export const DEMO_MODE = process.env.REACT_APP_DEMO_MODE === 'true' || process.env.NODE_ENV === 'development';

// Default contract address from environment or fallback to local
export const DEFAULT_CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || CONTRACT_ADDRESSES[1337];

// Default fallback values for development and testing
export const FALLBACK_VALUES = {
  presaleInfo: {
    price: ethers.utils.parseEther("0.00010382"),
    sold: ethers.utils.parseEther("10000"),
    remaining: ethers.utils.parseEther("13323333"),
    active: true
  },
  stakingInfo: {
    staked: ethers.utils.parseEther("0"),
    pendingRewards: ethers.utils.parseEther("0"),
    stakingTime: 0,
    unlockTime: 0
  }
};

// Import ethers for utility functions
import { ethers } from 'ethers';

// Complete ABI for DevilsCoin contract
export const DVC666_ABI = [
  // ERC20 Standard functions
  "function name() external view returns (string memory)",
  "function symbol() external view returns (string memory)",
  "function decimals() external view returns (uint8)",
  "function totalSupply() external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) external returns (bool)",
  
  // Presale functions
  "function buyTokens() external payable",
  "function quickBuy() external payable",
  "function getTokenAmount(uint256 ethAmount) external view returns (uint256)",
  "function getETHCost(uint256 tokenAmount) external view returns (uint256)",
  "function getPresaleInfo() external view returns (uint256 price, uint256 sold, uint256 remaining, bool active)",
  "function getPresaleProgress() external view returns (uint256)",
  "function getMinMaxPurchase() external view returns (uint256 min, uint256 max)",
  "function presalePrice() external view returns (uint256)",
  "function presaleSold() external view returns (uint256)",
  "function presaleCap() external view returns (uint256)",
  "function presaleActive() external view returns (bool)",
  "function minimumPurchase() external view returns (uint256)",
  "function maximumPurchase() external view returns (uint256)",
  
  // Staking functions
  "function stake(uint256 amount) external",
  "function unstake(uint256 amount) external",
  "function claimRewards() external",
  "function getStakingInfo(address user) external view returns (uint256 staked, uint256 pendingRewards, uint256 stakingTime, uint256 unlockTime)",
  "function calculateRewards(address user) external view returns (uint256)",
  "function stakedBalance(address user) external view returns (uint256)",
  "function stakingTimestamp(address user) external view returns (uint256)",
  "function totalStaked() external view returns (uint256)",
  "function stakingAPY() external view returns (uint256)",
  
  // Admin functions (for information only)
  "function owner() external view returns (address)",
  "function paused() external view returns (bool)",
  "function startPresale() external",
  "function endPresale() external",
  "function setPresalePrice(uint256 newPrice) external",
  "function withdrawETH() external",
  "function setStakingAPY(uint256 newAPY) external",
  
  // View functions
  "function getContractBalance() external view returns (uint256)",
  "function TOTAL_SUPPLY() external view returns (uint256)",
  "function PRESALE_SUPPLY() external view returns (uint256)",
  "function STAKING_REWARDS() external view returns (uint256)",
  "function TEAM_RESERVE() external view returns (uint256)",
  "function LIQUIDITY_POOL() external view returns (uint256)",
  "function STAKING_DURATION() external view returns (uint256)",
  
  // Events
  "event TokensPurchased(address indexed buyer, uint256 amount, uint256 cost)",
  "event Staked(address indexed user, uint256 amount)",
  "event Unstaked(address indexed user, uint256 amount)",
  "event RewardsClaimed(address indexed user, uint256 amount)",
  "event PresaleStarted()",
  "event PresaleEnded()",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
];

// Token metadata
export const TOKEN_METADATA = {
  name: "DVC666 Coin",
  symbol: "DVC666",
  decimals: 18,
  totalSupply: "66666666000000000000000000", // 66,666,666 tokens
  description: "Devil's Coin 666 - A revolutionary DeFi token with staking and presale features",
  image: "https://dvc666.vercel.app/dvc666-logo.png",
  website: "https://dvc666.vercel.app",
  social: {
    twitter: "https://twitter.com/dvc666official",
    discord: "https://discord.gg/dvc666",
    telegram: "https://t.me/dvc666"
  }
};

// Network configurations
export const NETWORK_CONFIGS = {
  1: {
    name: "Ethereum Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    blockExplorer: "https://etherscan.io",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18
    }
  },
  1337: {
    name: "Localhost",
    rpcUrl: "http://localhost:8545",
    blockExplorer: "http://localhost:8545",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18
    },
    isTestnet: true
  },
  11155111: {
    name: "Sepolia Testnet",
    rpcUrl: "https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    blockExplorer: "https://sepolia.etherscan.io",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SEP",
      decimals: 18
    },
    isTestnet: true
  }
};

// Get contract address for current network
export const getContractAddress = (chainId) => {
  // In development mode, always return the local address for easier testing
  if (process.env.NODE_ENV === 'development') {
    return CONTRACT_ADDRESSES[1337];
  }
  
  // For production, use the appropriate contract address or fallback to default
  return CONTRACT_ADDRESSES[chainId] || DEFAULT_CONTRACT_ADDRESS;
};

// Get network config for current network
export const getNetworkConfig = (chainId) => {
  return NETWORK_CONFIGS[chainId] || NETWORK_CONFIGS[1];
};

// Check if the current network is supported
export const isSupportedNetwork = (chainId) => {
  return !!CONTRACT_ADDRESSES[chainId];
};

// Get recommended network for current environment
export const getRecommendedNetwork = () => {
  return process.env.NODE_ENV === 'development' ? 1337 : 1;
};

// Validate contract address format
export const isValidContractAddress = (address) => {
  if (!address) return false;
  
  try {
    // More robust validation using ethers.js
    const normalizedAddress = ethers.utils.getAddress(address);
    return normalizedAddress.length === 42 && normalizedAddress.startsWith('0x');
  } catch (error) {
    console.error('Invalid contract address format:', error);
    return false;
  }
};

// Helper function to safely call contract methods with fallback values
export const safeContractCall = async (contractCall, fallbackValue) => {
  try {
    return await contractCall();
  } catch (error) {
    console.warn('Contract call failed, using fallback value:', error);
    return fallbackValue;
  }
};

// Contract constants
export const CONTRACT_CONSTANTS = {
  PRESALE_PRICE: "0.00010382", // ETH per DVC666
  MIN_PURCHASE: "0.001", // ETH
  MAX_PURCHASE: "10", // ETH
  STAKING_APY: 666, // 6.66% in basis points
  STAKING_DURATION: 30 * 24 * 60 * 60, // 30 days in seconds
  TOTAL_SUPPLY: 66666666,
  PRESALE_ALLOCATION: 13333333, // 20% of total supply
  STAKING_REWARDS: 20000000, // 30% of total supply
  TEAM_RESERVE: 6666666, // 10% of total supply
  LIQUIDITY_POOL: 26666667 // 40% of total supply
};

const contractsConfig = {
  CONTRACT_ADDRESSES,
  DEFAULT_CONTRACT_ADDRESS,
  DVC666_ABI,
  TOKEN_METADATA,
  NETWORK_CONFIGS,
  CONTRACT_CONSTANTS,
  FALLBACK_VALUES,
  DEMO_MODE,
  getContractAddress,
  getNetworkConfig,
  isValidContractAddress,
  isSupportedNetwork,
  getRecommendedNetwork,
  safeContractCall
};

export default contractsConfig;

