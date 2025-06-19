// contracts.js - Configuração centralizada dos contratos DVC666
// Endereços e ABIs para interação com contratos inteligentes

// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
  // Local Hardhat network
  1337: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  // Ethereum Mainnet (when deployed)
  1: process.env.REACT_APP_MAINNET_CONTRACT_ADDRESS || null,
  // Sepolia Testnet (when deployed)
  11155111: process.env.REACT_APP_SEPOLIA_CONTRACT_ADDRESS || null,
  // BSC Mainnet (when deployed)
  56: process.env.REACT_APP_BSC_CONTRACT_ADDRESS || null,
  // Polygon Mainnet (when deployed)
  137: process.env.REACT_APP_POLYGON_CONTRACT_ADDRESS || null
};

// Default contract address from environment or fallback to local
export const DEFAULT_CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || CONTRACT_ADDRESSES[1337];

// Complete ABI for DevilsCoin contract
export const DVC666_ABI = [
  // ERC20 Standard functions
  "function name() external view returns (string)",
  "function symbol() external view returns (string)",
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
    rpcUrl: "https://mainnet.infura.io/v3/",
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
    }
  },
  11155111: {
    name: "Sepolia Testnet",
    rpcUrl: "https://sepolia.infura.io/v3/",
    blockExplorer: "https://sepolia.etherscan.io",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SEP",
      decimals: 18
    }
  }
};

// Get contract address for current network
export const getContractAddress = (chainId) => {
  return CONTRACT_ADDRESSES[chainId] || DEFAULT_CONTRACT_ADDRESS;
};

// Get network config for current network
export const getNetworkConfig = (chainId) => {
  return NETWORK_CONFIGS[chainId] || NETWORK_CONFIGS[1337];
};

// Validate contract address format
export const isValidContractAddress = (address) => {
  if (!address) return false;
  // Basic Ethereum address validation
  return /^0x[a-fA-F0-9]{40}$/.test(address);
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
  getContractAddress,
  getNetworkConfig,
  isValidContractAddress
};

export default contractsConfig;

