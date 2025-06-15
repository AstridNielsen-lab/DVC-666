# 🔥 Devil's Coin (DVC) - Complete Cryptocurrency Ecosystem

![Devil's Coin Logo](https://via.placeholder.com/200x200/8B0000/FFFFFF?text=DVC)

**A next-generation cryptocurrency with custom PoS blockchain, staking, and DeFi capabilities**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.19-blue.svg)](https://soliditylang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)

---

## 🌟 Features

### 🔗 Blockchain & Token
- **Custom PoS Blockchain** with 13-second block times
- **66,666,666 DVC** total supply with 18 decimals
- **ERC-20 Compatible** smart contract
- **Deflationary Mechanics** with token burning

### 💰 DeFi Features
- **Staking Platform** with 6.66% APY
- **30-day Lock Period** for staking rewards
- **Presale Functionality** with dynamic pricing
- **Liquidity Pools** integration ready

### 🖥️ Complete Tech Stack
- **Smart Contracts** (Solidity)
- **Backend API** (Node.js, Express)
- **Frontend dApp** (React, Web3)
- **Real-time Updates** (Socket.io)
- **Dark Theme UI** with devilish aesthetics

### 🛡️ Security & Compliance
- **Multi-signature** wallet support
- **Pausable Contracts** for emergency stops
- **Rate Limiting** and DDoS protection
- **Legal Compliance** framework included

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git
- MetaMask or Web3 wallet

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/devils-coin.git
cd devils-coin

# Install dependencies for all components
npm run install-all

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Deploy smart contracts (local)
cd contracts
npm install
npm run compile
npm run deploy:localhost

# Start backend server
cd ../backend
npm install
npm run dev

# Start frontend (in another terminal)
cd ../frontend
npm install
npm start
```

### Environment Setup

Create `.env` files in each directory:

#### contracts/.env
```bash
PRIVATE_KEY=your_private_key_here
GOERLI_RPC_URL=https://goerli.infura.io/v3/YOUR_PROJECT_ID
ETHERSCAN_API_KEY=your_etherscan_api_key
```

#### backend/.env
```bash
PORT=5000
NODE_ENV=development
RPC_URL=http://localhost:8545
CONTRACT_ADDRESS=deployed_contract_address
PRIVATE_KEY=your_private_key_here
FRONTEND_URL=http://localhost:3000
```

#### frontend/.env
```bash
REACT_APP_API_URL=http://localhost:5000
REACT_APP_CONTRACT_ADDRESS=deployed_contract_address
REACT_APP_CHAIN_ID=1337
```

---

## 📁 Project Structure

```
devils-coin/
├── contracts/              # Smart contracts & deployment
│   ├── contracts/
│   │   └── DevilsCoin.sol  # Main token contract
│   ├── scripts/
│   │   └── deploy.js       # Deployment script
│   └── hardhat.config.js   # Hardhat configuration
├── backend/                # Node.js API server
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── middleware/         # Express middleware
│   └── server.js          # Main server file
├── frontend/               # React frontend dApp
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── styles/        # Styled components
│   └── public/            # Static assets
├── docs/                   # Documentation
│   └── whitepaper.md      # Technical whitepaper
└── scripts/               # Utility scripts
```

---

## 🔧 Smart Contract Details

### Token Specifications

| Parameter | Value |
|-----------|-------|
| **Name** | Devil's Coin |
| **Symbol** | DVC |
| **Decimals** | 18 |
| **Total Supply** | 66,666,666 DVC |
| **Consensus** | Proof of Stake |
| **Block Time** | 13 seconds |

### Token Distribution

- **20%** - Presale (13,333,333 DVC)
- **30%** - Staking Rewards (20,000,000 DVC)
- **40%** - Liquidity Pool (26,666,667 DVC)
- **10%** - Team & Development (6,666,666 DVC)

### Staking Features

```solidity
// Staking APY: 6.66% (666 basis points)
uint256 public stakingAPY = 666;

// Minimum staking period: 30 days
uint256 public constant STAKING_DURATION = 30 days;

// Staking function
function stake(uint256 _amount) external nonReentrant {
    // Staking logic with rewards calculation
}
```

---

## 🌐 API Endpoints

### Presale
- `GET /api/presale/info` - Get presale information
- `POST /api/presale/buy` - Purchase tokens
- `GET /api/presale/history/:address` - Purchase history

### Staking
- `GET /api/staking/info/:address` - Get staking info
- `POST /api/staking/stake` - Stake tokens
- `POST /api/staking/unstake` - Unstake tokens
- `POST /api/staking/claim` - Claim rewards

### Token
- `GET /api/token/info` - Token information
- `GET /api/token/balance/:address` - Get balance
- `GET /api/token/supply` - Total supply

### Analytics
- `GET /api/analytics/stats` - Platform statistics
- `GET /api/analytics/price` - Price information
- `GET /api/analytics/volume` - Trading volume

---

## 🎨 Frontend Features

### Dark Theme UI
- **Devilish Color Scheme** - Dark reds and blacks
- **Animated Backgrounds** - Particle effects
- **Responsive Design** - Mobile-first approach
- **Glass Morphism** - Modern UI effects

### Web3 Integration
- **MetaMask Connection** - Seamless wallet integration
- **Real-time Updates** - Live blockchain data
- **Transaction Monitoring** - Status tracking
- **Error Handling** - User-friendly error messages

### Key Components
- **Wallet Connect** - Multi-wallet support
- **Presale Interface** - Token purchase flow
- **Staking Dashboard** - Stake management
- **Portfolio Tracker** - Holdings overview

---

## 🛠️ Development

### Available Scripts

#### Root Level
```bash
npm run install-all    # Install all dependencies
npm run build-all      # Build all components
npm run test-all       # Run all tests
npm run clean          # Clean all builds
```

#### Contracts
```bash
npm run compile        # Compile contracts
npm run test          # Run tests
npm run deploy:localhost  # Deploy locally
npm run deploy:goerli    # Deploy to Goerli
npm run verify         # Verify on Etherscan
```

#### Backend
```bash
npm run dev           # Development server
npm start             # Production server
npm test              # Run tests
npm run db:migrate    # Database migrations
```

#### Frontend
```bash
npm start             # Development server
npm run build         # Production build
npm test              # Run tests
npm run analyze       # Bundle analysis
```

### Testing

```bash
# Test smart contracts
cd contracts
npm test

# Test backend API
cd backend
npm test

# Test frontend components
cd frontend
npm test
```

---

## 🚀 Deployment

### Local Development

1. **Start Hardhat Node**
   ```bash
   cd contracts
   npx hardhat node
   ```

2. **Deploy Contracts**
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

3. **Start Backend**
   ```bash
   cd backend
   npm run dev
   ```

4. **Start Frontend**
   ```bash
   cd frontend
   npm start
   ```

### Production Deployment

#### Smart Contracts
```bash
# Deploy to mainnet
npx hardhat run scripts/deploy.js --network mainnet

# Verify contract
npx hardhat verify --network mainnet CONTRACT_ADDRESS
```

#### Backend (PM2)
```bash
# Install PM2
npm install -g pm2

# Start with PM2
cd backend
pm2 start ecosystem.config.js
```

#### Frontend (Vercel)
```bash
# Option 1: Deploy via Vercel CLI
npm i -g vercel
vercel --prod

# Option 2: Deploy via GitHub (Recommended)
# 1. Connect your GitHub repo to Vercel
# 2. Set environment variables in Vercel dashboard:
#    REACT_APP_API_URL=https://your-api-domain.com
#    REACT_APP_CONTRACT_ADDRESS=0x...
#    REACT_APP_CHAIN_ID=1
# 3. Deploy automatically on push to main

# Option 3: Manual build and deploy
cd frontend
npm run build
vercel --prod --local-config ../vercel.json
```

#### Frontend (Netlify Alternative)
```bash
# Build for production
cd frontend
npm run build

# Deploy build folder to Netlify
```

---

## 📊 Monitoring & Analytics

### Real-time Metrics
- **Token Price** - Live price updates
- **Staking Stats** - Total staked, rewards
- **Network Health** - Block times, TPS
- **User Activity** - Active wallets, transactions

### API Monitoring
- **Health Checks** - `/health` endpoint
- **Error Tracking** - Comprehensive logging
- **Performance** - Response time monitoring
- **Security** - Rate limiting, DDoS protection

---

## 🔐 Security Considerations

### Smart Contract Security
- **Reentrancy Protection** - ReentrancyGuard
- **Overflow Protection** - SafeMath (Solidity 0.8+)
- **Access Control** - Role-based permissions
- **Pausable** - Emergency stop functionality

### Backend Security
- **Input Validation** - express-validator
- **Rate Limiting** - Protection against abuse
- **CORS** - Cross-origin request security
- **Helmet** - Security headers

### Frontend Security
- **XSS Protection** - Input sanitization
- **CSP Headers** - Content Security Policy
- **Secure Storage** - No private keys in localStorage
- **HTTPS Only** - Production deployment

---

## 📚 Documentation

- **[Technical Whitepaper](docs/whitepaper.md)** - Comprehensive technical documentation
- **[API Documentation](http://localhost:5000/api-docs)** - Interactive API docs (development)
- **[Smart Contract ABI](contracts/artifacts/contracts/DevilsCoin.sol/DevilsCoin.json)** - Contract interface
- **[Deployment Guide](docs/deployment.md)** - Step-by-step deployment

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style
- Write tests for new features
- Update documentation
- Ensure all tests pass

---

## 📄 Legal & Compliance

### Disclaimer

This project is for educational and demonstration purposes. Cryptocurrency investments carry significant risk. Please:

- **Conduct your own research** before investing
- **Consult legal and financial advisors**
- **Understand local regulations** regarding cryptocurrency
- **Never invest more than you can afford to lose**

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Compliance Features

- **KYC/AML Ready** - Framework for compliance
- **Geographic Restrictions** - Configurable access controls
- **Tax Reporting** - Transaction history for reporting
- **Audit Trail** - Comprehensive logging

---

## 🔮 Roadmap

### Phase 1: Foundation (Current)
- [x] Smart contract development
- [x] Backend API implementation
- [x] Frontend dApp creation
- [ ] Security audits
- [ ] Testnet deployment

### Phase 2: Launch (Q3 2025)
- [ ] Mainnet deployment
- [ ] Presale launch
- [ ] Exchange listings
- [ ] Community building

### Phase 3: Growth (Q4 2025)
- [ ] Mobile app
- [ ] Advanced staking tiers
- [ ] NFT integration
- [ ] Cross-chain bridges

### Phase 4: Ecosystem (2026)
- [ ] DeFi protocols
- [ ] Gaming integration
- [ ] Enterprise partnerships
- [ ] Global expansion

---

## 📞 Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/your-username/devils-coin/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/devils-coin/discussions)
- **Email**: support@devilscoin.io
- **Discord**: [Community Server](https://discord.gg/devilscoin)

---

## 📈 Statistics

![GitHub stars](https://img.shields.io/github/stars/your-username/devils-coin?style=social)
![GitHub forks](https://img.shields.io/github/forks/your-username/devils-coin?style=social)
![GitHub issues](https://img.shields.io/github/issues/your-username/devils-coin)
![GitHub license](https://img.shields.io/github/license/your-username/devils-coin)

---

**Made with 🔥 by the Devil's Coin Team**

*"Embrace the darkness, unleash the value."*

