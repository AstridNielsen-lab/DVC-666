# Devil's Coin Deployment Guide

This guide provides step-by-step instructions for deploying the Devil's Coin ecosystem across different environments.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Testnet Deployment](#testnet-deployment)
4. [Mainnet Deployment](#mainnet-deployment)
5. [Production Infrastructure](#production-infrastructure)
6. [Monitoring & Maintenance](#monitoring--maintenance)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements

- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher
- **Git**: Latest version
- **RAM**: Minimum 8GB (16GB recommended)
- **Storage**: Minimum 50GB SSD
- **OS**: Linux (Ubuntu 20.04+), macOS, or Windows 10+

### Required Accounts & Keys

1. **Ethereum Wallet**: Private key for contract deployment
2. **Infura Account**: For blockchain API access
3. **Etherscan Account**: For contract verification
4. **GitHub Account**: For code repository
5. **Cloud Provider**: AWS, GCP, or Azure (for production)

## Local Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/devils-coin.git
cd devils-coin
```

### 2. Install Dependencies

```bash
# Install all project dependencies
npm run install-all

# Or install individually
npm run install-contracts
npm run install-backend
npm run install-frontend
```

### 3. Environment Configuration

```bash
# Copy environment files
npm run setup-env

# Edit environment variables
# contracts/.env
# backend/.env
# frontend/.env
```

#### Contracts Environment (`contracts/.env`)

```bash
PRIVATE_KEY=your_development_private_key
GOERLI_RPC_URL=https://goerli.infura.io/v3/YOUR_PROJECT_ID
ETHERSCAN_API_KEY=your_etherscan_api_key
REPORT_GAS=true
```

#### Backend Environment (`backend/.env`)

```bash
PORT=5000
NODE_ENV=development
RPC_URL=http://localhost:8545
FRONTEND_URL=http://localhost:3000
PRIVATE_KEY=your_development_private_key
```

#### Frontend Environment (`frontend/.env`)

```bash
REACT_APP_API_URL=http://localhost:5000
REACT_APP_CHAIN_ID=1337
REACT_APP_CONTRACT_ADDRESS=
```

### 4. Start Local Blockchain

```bash
# Terminal 1: Start Hardhat node
cd contracts
npx hardhat node
```

### 5. Deploy Smart Contracts

```bash
# Terminal 2: Deploy contracts
cd contracts
npm run compile
npm run deploy:localhost

# Note the deployed contract address
```

### 6. Update Contract Address

Update the contract address in:
- `backend/.env` → `CONTRACT_ADDRESS`
- `frontend/.env` → `REACT_APP_CONTRACT_ADDRESS`

### 7. Start Backend Server

```bash
# Terminal 3: Start backend
cd backend
npm run dev
```

### 8. Start Frontend Application

```bash
# Terminal 4: Start frontend
cd frontend
npm start
```

### 9. Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs

## Testnet Deployment

### 1. Prepare Testnet Environment

```bash
# Get Goerli ETH from faucet
# https://goerlifaucet.com/

# Verify account has sufficient balance
npx hardhat console --network goerli
```

### 2. Deploy to Goerli

```bash
cd contracts

# Deploy to Goerli testnet
npm run deploy:goerli

# Verify contract on Etherscan
npx hardhat verify --network goerli CONTRACT_ADDRESS
```

### 3. Update Environment Variables

#### Backend (`backend/.env`)

```bash
NODE_ENV=staging
RPC_URL=https://goerli.infura.io/v3/YOUR_PROJECT_ID
CONTRACT_ADDRESS=deployed_goerli_address
CHAIN_ID=5
```

#### Frontend (`frontend/.env`)

```bash
REACT_APP_CHAIN_ID=5
REACT_APP_CONTRACT_ADDRESS=deployed_goerli_address
REACT_APP_RPC_URL=https://goerli.infura.io/v3/YOUR_PROJECT_ID
```

### 4. Deploy Backend (Staging)

```bash
# Using PM2
npm install -g pm2

cd backend
pm2 start ecosystem.config.js --env staging
```

### 5. Deploy Frontend (Staging)

```bash
cd frontend
npm run build

# Deploy to Netlify, Vercel, or your preferred platform
```

## Mainnet Deployment

⚠️ **WARNING**: Mainnet deployment involves real money. Double-check everything!

### 1. Security Checklist

- [ ] Smart contracts audited by third party
- [ ] All tests passing
- [ ] Environment variables secured
- [ ] Private keys properly managed
- [ ] Multi-signature wallet configured
- [ ] Emergency pause mechanisms tested
- [ ] Rate limiting configured
- [ ] Monitoring systems ready

### 2. Final Testing

```bash
# Run all tests
npm run test-all

# Security audit
npm audit

# Gas optimization check
cd contracts
npm run test
```

### 3. Deploy Smart Contracts

```bash
cd contracts

# Final compilation
npm run compile

# Deploy to mainnet
npm run deploy:mainnet

# Verify contract
npx hardhat verify --network mainnet CONTRACT_ADDRESS
```

### 4. Production Backend Setup

#### Environment Variables

```bash
# Production environment
NODE_ENV=production
PORT=5000
RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
CONTRACT_ADDRESS=mainnet_contract_address
CHAIN_ID=1

# Security
JWT_SECRET=very_secure_random_string
ENCRYPTION_KEY=another_secure_random_string

# Database
DATABASE_URL=postgresql://user:pass@host:5432/devilscoin
REDIS_URL=redis://host:6379
```

#### Deploy with PM2

```bash
cd backend

# Install dependencies
npm ci --only=production

# Start with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save
pm2 startup
```

### 5. Production Frontend Deployment

#### Build for Production

```bash
cd frontend

# Set production environment variables
export REACT_APP_API_URL=https://api.devilscoin.io
export REACT_APP_CONTRACT_ADDRESS=mainnet_contract_address
export REACT_APP_CHAIN_ID=1

# Build
npm run build
```

#### Deploy to CDN

```bash
# Example: Deploy to AWS S3 + CloudFront
aws s3 sync build/ s3://devilscoin-frontend
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## Production Infrastructure

### Recommended Architecture

```
[Internet] → [Load Balancer] → [Frontend CDN]
     ↓
[API Gateway] → [Backend Servers] → [Database]
     ↓                ↓               ↓
[Cache Layer]    [File Storage]   [Blockchain Node]
```

### AWS Infrastructure Example

#### 1. Frontend (Static Hosting)

- **S3 Bucket**: Static website hosting
- **CloudFront**: Global CDN
- **Route 53**: DNS management
- **ACM**: SSL certificates

#### 2. Backend (API Server)

- **EC2 Instances**: t3.medium (minimum)
- **Application Load Balancer**: Traffic distribution
- **Auto Scaling Group**: Handle traffic spikes
- **ECS/EKS**: Container orchestration (optional)

#### 3. Database Layer

- **RDS PostgreSQL**: Primary database
- **ElastiCache Redis**: Caching layer
- **S3**: File storage and backups

#### 4. Monitoring & Security

- **CloudWatch**: Monitoring and alerting
- **WAF**: Web application firewall
- **VPC**: Network isolation
- **IAM**: Access management

### Docker Setup

#### Backend Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

#### Docker Compose

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/devilscoin
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=devilscoin
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

## Monitoring & Maintenance

### Health Checks

```bash
# Backend health
curl https://api.devilscoin.io/health

# Contract verification
npx hardhat verify --network mainnet CONTRACT_ADDRESS

# Database connection
psql $DATABASE_URL -c "SELECT 1;"
```

### Monitoring Setup

#### 1. Application Monitoring

- **New Relic**: Application performance
- **Datadog**: Infrastructure monitoring
- **Sentry**: Error tracking
- **LogRocket**: Frontend session replay

#### 2. Blockchain Monitoring

- **Tenderly**: Smart contract monitoring
- **OpenZeppelin Defender**: Security monitoring
- **Etherscan**: Transaction tracking

#### 3. Alerting

```javascript
// Example alert configuration
const alerts = {
  highErrorRate: {
    metric: 'error_rate',
    threshold: 5, // 5%
    duration: '5m'
  },
  highResponseTime: {
    metric: 'response_time',
    threshold: 2000, // 2 seconds
    duration: '5m'
  },
  lowTokenBalance: {
    metric: 'contract_balance',
    threshold: 1000, // 1000 DVC
    duration: '1m'
  }
};
```

### Backup Procedures

#### 1. Database Backup

```bash
# Daily backup script
#!/bin/bash
DATE=$(date +"%Y%m%d_%H%M%S")
DUMP_FILE="backup_${DATE}.sql"

pg_dump $DATABASE_URL > $DUMP_FILE
aws s3 cp $DUMP_FILE s3://devilscoin-backups/
rm $DUMP_FILE
```

#### 2. Configuration Backup

```bash
# Backup environment files
tar -czf config_backup_$(date +%Y%m%d).tar.gz \    
  contracts/.env \    
  backend/.env \    
  frontend/.env
```

### Update Procedures

#### 1. Smart Contract Updates

```bash
# Use proxy patterns for upgradeable contracts
# Or deploy new version and migrate

cd contracts
npx hardhat run scripts/upgrade.js --network mainnet
```

#### 2. Backend Updates

```bash
# Rolling update with PM2
cd backend
git pull origin main
npm ci --only=production
pm2 reload ecosystem.config.js --env production
```

#### 3. Frontend Updates

```bash
# Build and deploy new version
cd frontend
git pull origin main
npm ci
npm run build
aws s3 sync build/ s3://devilscoin-frontend
```

## Troubleshooting

### Common Issues

#### 1. Contract Deployment Fails

```bash
# Check gas price and limit
npx hardhat run scripts/deploy.js --network mainnet --verbose

# Verify account balance
npx hardhat console --network mainnet
> (await ethers.provider.getBalance(deployer.address))
```

#### 2. Backend API Errors

```bash
# Check logs
pm2 logs

# Restart service
pm2 restart all

# Check environment variables
pm2 env 0
```

#### 3. Frontend Connection Issues

```bash
# Check API connectivity
curl https://api.devilscoin.io/health

# Verify contract address
# Check browser console for errors
# Verify MetaMask network settings
```

#### 4. Database Connection Issues

```bash
# Test database connection
psql $DATABASE_URL -c "SELECT version();"

# Check connection pool
# Monitor database logs
# Verify network security groups
```

### Emergency Procedures

#### 1. Pause Smart Contract

```javascript
// Emergency pause (if implemented)
const contract = await ethers.getContractAt("DevilsCoin", contractAddress);
await contract.pause();
```

#### 2. Scale Backend

```bash
# Quickly scale backend instances
pm2 scale app 4  # Scale to 4 instances

# Or with Docker
docker-compose up --scale backend=4
```

#### 3. Rollback Deployment

```bash
# Rollback to previous version
git checkout previous_version_tag
npm run build-all
# Redeploy
```

### Performance Optimization

#### 1. Database Optimization

```sql
-- Add indexes for frequent queries
CREATE INDEX idx_transactions_user ON transactions(user_address);
CREATE INDEX idx_transactions_timestamp ON transactions(created_at);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM transactions WHERE user_address = '0x...';
```

#### 2. API Optimization

```javascript
// Implement caching
const redis = require('redis');
const client = redis.createClient();

// Cache expensive operations
app.get('/api/stats', cache(300), async (req, res) => {
  // 5-minute cache
  const stats = await calculateStats();
  res.json(stats);
});
```

#### 3. Frontend Optimization

```javascript
// Code splitting
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Memoization
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Expensive rendering */}</div>;
});
```

## Security Considerations

### 1. Smart Contract Security

- Regular security audits
- Bug bounty programs
- Formal verification
- Emergency pause mechanisms
- Multi-signature requirements

### 2. API Security

- Rate limiting
- Input validation
- Authentication/authorization
- HTTPS enforcement
- CORS configuration

### 3. Infrastructure Security

- VPC isolation
- Security groups
- WAF protection
- DDoS mitigation
- Regular security updates

### 4. Operational Security

- Key management (AWS KMS)
- Secrets rotation
- Access logging
- Regular backups
- Incident response plan

---

This deployment guide should be updated as the project evolves and new requirements emerge. Always test deployments in staging environments before applying to production.

