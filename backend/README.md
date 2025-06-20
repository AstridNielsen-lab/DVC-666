# DVC666 Smart Contract Backend

🔥 **Devil's Coin 666** - Advanced ERC20 Token with Presale, Staking & Evolution System

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MetaMask or compatible wallet
- Some ETH for gas fees

### Installation

```bash
# Clone and navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your keys
nano .env
```

### Environment Setup

Edit `.env` file:

```env
# Your private key (without 0x prefix)
PRIVATE_KEY=your_private_key_here

# RPC URLs
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
MAINNET_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY

# API Keys
ETHERSCAN_API_KEY=your_etherscan_api_key
BSCSCAN_API_KEY=your_bscscan_api_key
```

## 📋 Available Commands

### Development
```bash
# Compile contracts
npm run compile

# Run tests
npm run test

# Start local blockchain
npm run node

# Start backend server
npm run dev
```

### Deployment
```bash
# Deploy to localhost
npm run deploy:local

# Deploy to Sepolia testnet
npm run deploy:sepolia

# Deploy to BSC mainnet
npm run deploy:bsc

# Deploy to Ethereum mainnet
npm run deploy:mainnet
```

### Verification
```bash
# Verify on Etherscan (Sepolia)
npm run verify:sepolia CONTRACT_ADDRESS OWNER_ADDRESS

# Verify on Etherscan (Mainnet)
npm run verify:mainnet CONTRACT_ADDRESS OWNER_ADDRESS
```

## 🎯 Step-by-Step Deployment

### 1. Deploy to Local Network (Testing)

```bash
# Terminal 1: Start local blockchain
npm run node

# Terminal 2: Deploy contract
npm run deploy:local

# Terminal 3: Start backend server
npm run dev
```

### 2. Deploy to Sepolia Testnet

```bash
# Get Sepolia ETH from faucet
# https://sepolia-faucet.pk910.de/

# Deploy to Sepolia
npm run deploy:sepolia

# Verify contract
npm run verify:sepolia [CONTRACT_ADDRESS] [OWNER_ADDRESS]
```

### 3. Deploy to Mainnet

```bash
# ⚠️ ENSURE YOU HAVE ENOUGH ETH FOR GAS!
# Deploy to mainnet
npm run deploy:mainnet

# Verify contract
npm run verify:mainnet [CONTRACT_ADDRESS] [OWNER_ADDRESS]
```

## 🔧 Contract Features

### Core Token (ERC20)
- **Name**: Devil's Coin 666
- **Symbol**: DVC666
- **Decimals**: 18
- **Total Supply**: 66,666,666 DVC666

### Token Distribution
- 🔥 **Presale**: 13,333,333 (20%)
- 🥩 **Staking Rewards**: 20,000,000 (30%)
- 💼 **Team Reserve**: 6,666,666 (10%)
- 💧 **Liquidity Pool**: 26,666,667 (40%)

### Presale
- **Price**: 0.00010382 ETH per DVC666
- **Min Purchase**: 0.001 ETH
- **Max Purchase**: 10 ETH
- **Duration**: 30 days (configurable)

### Staking System
- **APY**: 6.66%
- **Lock Period**: 30 days
- **Compound Rewards**: Available
- **Early Withdrawal**: Penalty applies

### Evolution System
- **9 Evolution Levels**: Every ~40 days
- **Bonus Increases**: +0.5% per evolution
- **Current Evolution**: Level 1 (1% bonus)

### Security Features
- ✅ **Pausable**: Emergency stop
- ✅ **Blacklist**: Address blocking
- ✅ **ReentrancyGuard**: Attack protection
- ✅ **Ownable**: Admin controls
- ✅ **Rate Limiting**: Transaction limits

## 📊 Contract Functions

### Presale Functions
```solidity
// Buy tokens during presale
function buyTokens() external payable;

// Buy with evolution bonus
function quickBuy() external payable;

// Get presale information
function getPresaleInfo() external view returns (uint256, uint256, uint256, bool);
```

### Staking Functions
```solidity
// Stake tokens
function stake(uint256 amount) external;

// Unstake tokens
function unstake(uint256 amount) external;

// Claim rewards
function claimRewards() external;

// Get staking info
function getStakingInfo(address user) external view returns (uint256, uint256, uint256, uint256);
```

### Admin Functions
```solidity
// Start/end presale
function startPresale(uint256 duration) external onlyOwner;
function endPresale() external onlyOwner;

// Enable trading
function enableTrading() external onlyOwner;

// Pause/unpause
function pause() external onlyOwner;
function unpause() external onlyOwner;

// Evolution system
function triggerEvolution() external onlyAuthorized;
```

## 🔍 Testing

Run comprehensive tests:

```bash
# Run all tests
npm run test

# Run specific test file
npx hardhat test test/DVC666.test.js

# Run tests with gas reporting
REPORT_GAS=true npm run test
```

## 📈 Post-Deployment Steps

### 1. Verify Contract
```bash
# On Etherscan
npx hardhat verify --network sepolia CONTRACT_ADDRESS OWNER_ADDRESS
```

### 2. Update Frontend
The deploy script automatically updates the frontend contract configuration.

### 3. Initialize Contract
```bash
# Start presale (30 days)
contract.startPresale(30 * 24 * 60 * 60)

# Enable trading
contract.enableTrading()
```

### 4. Add Liquidity
- Add ETH/DVC666 pair to Uniswap
- Set initial liquidity ratio
- Lock LP tokens

### 5. Marketing
- Announce presale launch
- Update social media
- Submit to token trackers

## 🛡️ Security Considerations

### Private Key Management
- **Never commit private keys**
- Use hardware wallets for mainnet
- Use environment variables
- Rotate keys regularly

### Contract Security
- Audited by multiple developers
- Uses OpenZeppelin contracts
- Comprehensive testing
- Reentrancy protection

### Access Control
- Owner controls critical functions
- Authorized addresses for evolution
- Blacklist for malicious actors
- Pausable for emergencies

## 🔧 Troubleshooting

### Common Issues

**Deployment Fails**
```bash
# Check gas price
# Check account balance
# Verify RPC URL
# Check private key format
```

**Tests Fail**
```bash
# Clear cache
npx hardhat clean

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Gas Estimation Error**
```bash
# Increase gas limit in hardhat.config.js
# Check network congestion
# Verify contract size limits
```

## 📚 Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Etherscan API](https://docs.etherscan.io/)
- [Solidity Documentation](https://docs.soliditylang.org/)

## 🤝 Support

For technical support:
- Check the troubleshooting section
- Review test files for examples
- Open an issue on GitHub

---

**🔥 DVC666 - Ready to conquer the blockchain! 🔥**

