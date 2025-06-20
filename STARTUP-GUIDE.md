# 🔥 Devils Coin - Startup Guide 🔥

**Complete guide to running the Devils Coin (DVC666) full-stack application**

## 🚀 Quick Start

### Option 1: Automated Startup (Recommended)
```bash
# Run compatibility check first
npm run check

# Start both frontend and backend
npm start
```

### Option 2: Manual Startup
```bash
# Terminal 1 - Backend
npm run start:backend
# or: cd backend && npm run dev

# Terminal 2 - Frontend
npm run start:frontend
# or: cd frontend && npm start
```

### Option 3: Individual Components
```bash
# Frontend only
cd frontend
npm start

# Backend only
cd backend
npm run dev

# Contracts (blockchain)
cd contracts
npm run node
```

## 📋 Prerequisites

### Required Software
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Git**

### Check Your Environment
```bash
node --version    # Should be >= 18.0.0
npm --version     # Should be >= 9.0.0
```

### Install Dependencies
```bash
# Install all dependencies at once
npm run install-all

# Or install individually
npm run install-frontend
npm run install-backend
npm run install-contracts
```

## 🔧 Configuration

### Environment Variables

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
REACT_APP_CHAIN_ID=1337
```

#### Backend (.env)
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Port Configuration
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **Contracts**: http://localhost:8545

## 🛠️ Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using the port
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Kill the process (Windows)
taskkill /PID <process_id> /F

# Use different ports
PORT=3001 npm start  # Frontend
PORT=5001 npm run dev  # Backend
```

#### 2. Dependency Issues
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# For all packages
npm run clean
npm run install-all
```

#### 3. Webpack/React Issues
```bash
# Frontend specific fixes
cd frontend
rm -rf node_modules build
npm install
npm start

# If still having issues
export GENERATE_SOURCEMAP=false
export ESLINT_NO_DEV_ERRORS=true
npm start
```

#### 4. Ethers.js Compatibility
The project uses **Ethers v5.7.2** which is compatible with all current patterns:
- ✅ `ethers.providers.Web3Provider`
- ✅ `ethers.utils.formatEther`
- ✅ `ethers.utils.parseEther`

#### 5. Socket.io Connection Issues
```bash
# Backend and frontend use matching versions
# Backend: socket.io ^4.7.2
# Frontend: socket.io-client ^4.7.2
```

### Error Messages & Solutions

| Error | Solution |
|-------|----------|
| `EADDRINUSE` | Port already in use - change port or kill process |
| `Module not found` | Run `npm install` in the affected directory |
| `Webpack failed to compile` | Check for syntax errors, restart dev server |
| `Connection refused` | Make sure backend is running first |
| `MetaMask not detected` | Install MetaMask browser extension |

## 🎯 Application URLs

Once running, access these URLs:

### Frontend
- **Main App**: http://localhost:3000
- **Pages**:
  - Home: http://localhost:3000/
  - Presale: http://localhost:3000/presale
  - Staking: http://localhost:3000/staking
  - Dashboard: http://localhost:3000/dashboard
  - Wallet: http://localhost:3000/wallet

### Backend
- **API Base**: http://localhost:5000
- **Health Check**: http://localhost:5000/health
- **API Docs**: http://localhost:5000/api-docs (dev mode)

### Development Tools
- **React DevTools**: Install browser extension
- **Redux DevTools**: Available in development
- **Webpack Bundle Analyzer**: `npm run analyze` (frontend)

## 🔍 Compatibility Check

Run the compatibility checker before starting:

```bash
npm run check
```

This will verify:
- ✅ Node.js version
- ✅ Package versions
- ✅ Ethers.js compatibility
- ✅ Environment files
- ✅ Dependency conflicts

## 📊 Performance Tips

### Frontend Optimization
```bash
# Disable source maps for faster builds
export GENERATE_SOURCEMAP=false

# Skip ESLint errors in development
export ESLINT_NO_DEV_ERRORS=true

# Enable React Fast Refresh
export FAST_REFRESH=true
```

### Backend Optimization
```bash
# Use nodemon for auto-restart
npm install -g nodemon

# Enable debug mode
export DEBUG=devils-coin:*
```

## 🔒 Security Considerations

### Development Mode
- CORS is enabled for localhost:3000
- API rate limiting is relaxed
- Debug information is visible

### Environment Files
- Never commit `.env` files to git
- Use `.env.example` as templates
- Different configs for dev/prod

## 🧪 Testing

```bash
# Run all tests
npm run test-all

# Individual tests
npm run test-frontend
npm run test-backend
npm run test-contracts

# With coverage
cd frontend && npm run test -- --coverage
cd backend && npm run test:coverage
```

## 🚀 Production Build

```bash
# Build for production
npm run build-all

# Just frontend
npm run build-frontend

# Deploy to Vercel
npm run deploy
```

## 📞 Support

If you encounter issues:

1. **Check this guide** for common solutions
2. **Run compatibility check**: `npm run check`
3. **Clear cache and reinstall**: `npm run clean && npm run install-all`
4. **Check logs** for specific error messages
5. **Verify environment** variables are set correctly

### Debug Information
```bash
# Frontend debug
cd frontend && npm start
# Look for errors in browser console

# Backend debug
cd backend && DEBUG=* npm run dev
# Check terminal output for errors
```

---

**🔥 Happy coding with Devils Coin! 🔥**

*The devil's in the details, but the rewards are divine.*

