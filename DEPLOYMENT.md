# 🔥 DVC666 Smart Contract Deployment Guide

**Devil's Coin 666** - Complete deployment instructions for the real smart contract

## 🚀 Quick Deploy (Recommended)

### For Local Testing

```bash
# Navigate to backend
cd backend

# One-command setup (installs, compiles, tests, deploys)
npm run quick-start
```

This will:
- ✅ Install all dependencies
- ✅ Compile smart contracts
- ✅ Run full test suite
- ✅ Start local blockchain
- ✅ Deploy DVC666 contract
- ✅ Start backend server
- ✅ Update frontend configuration

## 🎯 Manual Deployment

### Prerequisites

1. **Node.js 18+** installed
2. **MetaMask** or hardware wallet
3. **ETH for gas fees** (mainnet) or testnet ETH
4. **API keys** (Infura, Etherscan)

### Step 1: Environment Setup

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Your wallet private key (KEEP SECRET!)
PRIVATE_KEY=your_private_key_without_0x

# RPC URLs
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
MAINNET_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY

# API Keys for verification
ETHERSCAN_API_KEY=your_etherscan_api_key
BSCSCAN_API_KEY=your_bscscan_api_key
```

### Step 2: Install & Compile

```bash
# Install dependencies
npm install

# Compile contracts
npm run compile

# Run tests to ensure everything works
npm run test
```

### Step 3: Deploy Contract

#### Local Development
```bash
# Terminal 1: Start local blockchain
npm run node

# Terminal 2: Deploy to local network
npm run deploy:local
```

#### Sepolia Testnet
```bash
# Get testnet ETH from faucet first
# https://sepolia-faucet.pk910.de/

# Deploy to Sepolia
npm run deploy:sepolia
```

#### Ethereum Mainnet
```bash
# ⚠️ ENSURE YOU HAVE ENOUGH ETH FOR GAS!
# Deploy to mainnet
npm run deploy:mainnet
```

#### BSC Mainnet
```bash
# Deploy to Binance Smart Chain
npm run deploy:bsc
```

### Step 4: Verify Contract

```bash
# Verify on Etherscan (Sepolia)
npm run verify:sepolia CONTRACT_ADDRESS DEPLOYER_ADDRESS

# Verify on Etherscan (Mainnet)
npm run verify:mainnet CONTRACT_ADDRESS DEPLOYER_ADDRESS

# Verify on BSCScan
npm run verify:bsc CONTRACT_ADDRESS DEPLOYER_ADDRESS
```

### Step 5: Start Backend

```bash
# Start backend server
npm run dev
```

## 📊 Contract Information

### Token Details
- **Name**: Devil's Coin 666
- **Symbol**: DVC666
- **Decimals**: 18
- **Total Supply**: 66,666,666 DVC666

### Distribution
- 🔥 **Presale**: 13,333,333 (20%)
- 🥩 **Staking**: 20,000,000 (30%)
- 💼 **Team**: 6,666,666 (10%)
- 💧 **Liquidity**: 26,666,667 (40%)

### Presale Parameters
- **Price**: 0.00010382 ETH per DVC666 (~$0.001 USD)
- **Min Purchase**: 0.001 ETH
- **Max Purchase**: 10 ETH
- **Duration**: 30 days

### Staking Features
- **APY**: 6.66%
- **Lock Period**: 30 days
- **Rewards**: Auto-compound available

## 🔧 Post-Deployment Setup

### 1. Initialize Contract

After deployment, the contract automatically:
- ✅ Starts the presale (30-day duration)
- ✅ Enables trading
- ✅ Sets up evolution system

### 2. Update Frontend

The deployment script automatically updates the frontend configuration with the new contract address.

### 3. Configure MetaMask

Add the custom token to MetaMask:
- **Contract Address**: [from deployment output]
- **Symbol**: DVC666
- **Decimals**: 18

### 4. Test Functionality

```bash
# Test presale purchase
# Connect to your deployed network and try buying tokens

# Test staking
# Stake some tokens and verify rewards

# Test admin functions
# Only contract owner can access these
```

## 🛡️ Security Checklist

### Before Mainnet Deployment

- [ ] **Private keys secured** (hardware wallet recommended)
- [ ] **All tests passing** (`npm run test`)
- [ ] **Gas price optimized** (check network congestion)
- [ ] **Contract verified** on block explorer
- [ ] **Team multisig setup** (for production)

### Smart Contract Security

- ✅ **OpenZeppelin contracts** (battle-tested)
- ✅ **ReentrancyGuard** (prevents attacks)
- ✅ **Pausable** (emergency stop)
- ✅ **Access control** (owner/authorized roles)
- ✅ **Rate limiting** (transaction limits)

## 📈 Going Live Checklist

### Pre-Launch
- [ ] Contract deployed and verified
- [ ] Frontend updated with contract address
- [ ] Presale parameters configured
- [ ] Team tokens allocated
- [ ] Marketing materials ready

### Launch Day
- [ ] Announce presale start
- [ ] Monitor contract for any issues
- [ ] Engage with community
- [ ] Track presale progress

### Post-Launch
- [ ] Add liquidity to DEX
- [ ] Submit to token trackers (CoinGecko, CoinMarketCap)
- [ ] Enable staking rewards
- [ ] Monitor evolution system

## 🚨 Emergency Procedures

### If Issues Arise

1. **Pause Contract** (owner only)
   ```solidity
   contract.pause()
   ```

2. **Blacklist Address** (if needed)
   ```solidity
   contract.setBlacklist(address, true)
   ```

3. **End Presale Early** (if needed)
   ```solidity
   contract.endPresale()
   ```

## 📞 Support & Resources

### Documentation
- [Hardhat Docs](https://hardhat.org/docs)
- [OpenZeppelin Docs](https://docs.openzeppelin.com/)
- [Ethers.js Docs](https://docs.ethers.io/)

### Block Explorers
- **Ethereum**: [etherscan.io](https://etherscan.io)
- **Sepolia**: [sepolia.etherscan.io](https://sepolia.etherscan.io)
- **BSC**: [bscscan.com](https://bscscan.com)

### Gas Optimization
- Check current gas prices: [ethgasstation.info](https://ethgasstation.info)
- Optimize deployment time for lower fees

---

## 🎯 Example Deployment Output

```bash
🔥 Starting DVC666 deployment...
📋 Deploying with account: 0x742d35Cc6abB31B79F0a0c1234567890123456789
💰 Account balance: 5.234 ETH
📦 Getting DVC666 contract factory...
🚀 Deploying DVC666 contract...
⏳ Waiting for deployment confirmation...

🎉 DVC666 Contract deployed successfully!
📍 Contract address: 0x1234567890123456789012345678901234567890
🔗 Transaction hash: 0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890
🌐 Network: sepolia (Chain ID: 11155111)

📊 Verifying initial contract state:
   Token Name: Devil's Coin 666
   Token Symbol: DVC666
   Decimals: 18
   Total Supply: 66666666.0 DVC666
   Owner: 0x742d35Cc6abB31B79F0a0c1234567890123456789
   Presale Price: 0.00010382 ETH per token

🔥 Starting presale...
✅ Presale started successfully!
🔄 Enabling trading...
✅ Trading enabled successfully!

🎯 Next Steps:
1. Update your .env file with the contract address
2. Verify the contract on Etherscan
3. Add liquidity to DEX
4. Start marketing the presale

🔍 To verify on Etherscan:
npx hardhat verify --network sepolia 0x1234567890123456789012345678901234567890 0x742d35Cc6abB31B79F0a0c1234567890123456789

🔥 DVC666 is ready to conquer the crypto world! 🔥
```

---

**🔥 Devil's Coin 666 - The future of DeFi is here! 🔥**

