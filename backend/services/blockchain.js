const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

class BlockchainService {
  constructor() {
    this.provider = null;
    this.contract = null;
    this.signer = null;
    this.contractAddress = null;
    this.contractABI = null;
  }

  async initialize() {
    try {
      // Initialize provider
      const rpcUrl = process.env.RPC_URL || 'http://localhost:8545';
      this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      
      // Test connection
      await this.provider.getNetwork();
      console.log('✅ Connected to blockchain');
      
      // Initialize signer if private key is provided
      if (process.env.PRIVATE_KEY) {
        this.signer = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
        console.log('✅ Wallet initialized:', this.signer.address);
      }
      
      // Load contract
      await this.loadContract();
      
    } catch (error) {
      console.error('❌ Failed to initialize blockchain service:', error);
      throw error;
    }
  }
  
  async loadContract() {
    try {
      // Load contract ABI
      const abiPath = path.join(__dirname, '../../contracts/artifacts/contracts/DevilsCoin.sol/DevilsCoin.json');
      if (fs.existsSync(abiPath)) {
        const contractJson = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
        this.contractABI = contractJson.abi;
      } else {
        // Fallback ABI if compiled contract not found
        this.contractABI = this.getMinimalABI();
      }
      
      // Load contract address from deployment
      const deploymentPath = path.join(__dirname, '../../contracts/deployments');
      if (fs.existsSync(deploymentPath)) {
        const files = fs.readdirSync(deploymentPath);
        const deploymentFile = files.find(f => f.endsWith('-deployment.json'));
        if (deploymentFile) {
          const deployment = JSON.parse(fs.readFileSync(path.join(deploymentPath, deploymentFile), 'utf8'));
          this.contractAddress = deployment.contractAddress;
        }
      }
      
      // Use environment variable if deployment file not found
      if (!this.contractAddress) {
        this.contractAddress = process.env.CONTRACT_ADDRESS;
      }
      
      if (this.contractAddress && this.contractABI) {
        this.contract = new ethers.Contract(
          this.contractAddress,
          this.contractABI,
          this.signer || this.provider
        );
        console.log('✅ Contract loaded:', this.contractAddress);
      } else {
        console.log('⚠️ Contract not loaded - address or ABI missing');
      }
      
    } catch (error) {
      console.error('❌ Failed to load contract:', error);
    }
  }
  
  getMinimalABI() {
    return [
      "function name() view returns (string)",
      "function symbol() view returns (string)",
      "function decimals() view returns (uint8)",
      "function totalSupply() view returns (uint256)",
      "function balanceOf(address) view returns (uint256)",
      "function getPresaleInfo() view returns (uint256 price, uint256 sold, uint256 remaining, bool active)",
      "function getStakingInfo(address) view returns (uint256 staked, uint256 pendingRewards, uint256 stakingTime, uint256 unlockTime)",
      "function buyTokens() payable",
      "function stake(uint256 amount)",
      "function unstake(uint256 amount)",
      "function claimRewards()",
      "function startPresale()",
      "function endPresale()",
      "function setPresalePrice(uint256 newPrice)",
      "event TokensPurchased(address indexed buyer, uint256 amount, uint256 cost)",
      "event Staked(address indexed user, uint256 amount)",
      "event Unstaked(address indexed user, uint256 amount)",
      "event RewardsClaimed(address indexed user, uint256 amount)"
    ];
  }
  
  // Token information methods
  async getTokenInfo() {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const [name, symbol, decimals, totalSupply] = await Promise.all([
      this.contract.name(),
      this.contract.symbol(),
      this.contract.decimals(),
      this.contract.totalSupply()
    ]);
    
    return {
      name,
      symbol,
      decimals: decimals.toString(),
      totalSupply: ethers.utils.formatEther(totalSupply),
      address: this.contractAddress
    };
  }
  
  async getBalance(address) {
    if (!this.contract) throw new Error('Contract not initialized');
    const balance = await this.contract.balanceOf(address);
    return ethers.utils.formatEther(balance);
  }
  
  // Presale methods
  async getPresaleInfo() {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const info = await this.contract.getPresaleInfo();
    return {
      price: ethers.utils.formatEther(info.price),
      sold: ethers.utils.formatEther(info.sold),
      remaining: ethers.utils.formatEther(info.remaining),
      cap: ethers.utils.formatEther(info.sold.add(info.remaining)),
      active: info.active
    };
  }
  
  async getPresaleStats() {
    const info = await this.getPresaleInfo();
    const progress = (parseFloat(info.sold) / (parseFloat(info.sold) + parseFloat(info.remaining))) * 100;
    
    return {
      progress: progress.toFixed(2),
      totalRaised: (parseFloat(info.sold) * parseFloat(info.price)).toFixed(4),
      participantCount: await this.getPresaleParticipantCount()
    };
  }
  
  async getPresaleParticipantCount() {
    // This would require tracking purchase events
    // For now, return a placeholder
    return 0;
  }
  
  async calculateTokenAmount(ethAmount) {
    const presaleInfo = await this.getPresaleInfo();
    const tokenAmount = parseFloat(ethAmount) / parseFloat(presaleInfo.price);
    return ethers.utils.parseEther(tokenAmount.toString());
  }
  
  async processPresalePurchase({ amount, walletAddress, tokenAmount }) {
    if (!this.contract || !this.signer) {
      throw new Error('Contract or signer not initialized');
    }
    
    const tx = await this.contract.buyTokens({
      value: ethers.utils.parseEther(amount)
    });
    
    return await tx.wait();
  }
  
  async startPresale() {
    if (!this.contract || !this.signer) {
      throw new Error('Contract or signer not initialized');
    }
    
    const tx = await this.contract.startPresale();
    return await tx.wait();
  }
  
  async endPresale() {
    if (!this.contract || !this.signer) {
      throw new Error('Contract or signer not initialized');
    }
    
    const tx = await this.contract.endPresale();
    return await tx.wait();
  }
  
  async setPresalePrice(price) {
    if (!this.contract || !this.signer) {
      throw new Error('Contract or signer not initialized');
    }
    
    const tx = await this.contract.setPresalePrice(ethers.utils.parseEther(price));
    return await tx.wait();
  }
  
  async getPresaleHistory(address) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    // Get TokensPurchased events for this address
    const filter = this.contract.filters.TokensPurchased(address);
    const events = await this.contract.queryFilter(filter);
    
    return events.map(event => ({
      transactionHash: event.transactionHash,
      blockNumber: event.blockNumber,
      timestamp: null, // Would need to fetch block timestamp
      tokenAmount: ethers.utils.formatEther(event.args.amount),
      ethCost: ethers.utils.formatEther(event.args.cost)
    }));
  }
  
  // Staking methods
  async getStakingInfo(address) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const info = await this.contract.getStakingInfo(address);
    return {
      staked: ethers.utils.formatEther(info.staked),
      pendingRewards: ethers.utils.formatEther(info.pendingRewards),
      stakingTime: info.stakingTime.toString(),
      unlockTime: info.unlockTime.toString(),
      canUnstake: Date.now() / 1000 >= info.unlockTime.toNumber()
    };
  }
  
  async stake(amount) {
    if (!this.contract || !this.signer) {
      throw new Error('Contract or signer not initialized');
    }
    
    const tx = await this.contract.stake(ethers.utils.parseEther(amount));
    return await tx.wait();
  }
  
  async unstake(amount) {
    if (!this.contract || !this.signer) {
      throw new Error('Contract or signer not initialized');
    }
    
    const tx = await this.contract.unstake(ethers.utils.parseEther(amount));
    return await tx.wait();
  }
  
  async claimRewards() {
    if (!this.contract || !this.signer) {
      throw new Error('Contract or signer not initialized');
    }
    
    const tx = await this.contract.claimRewards();
    return await tx.wait();
  }
  
  // Utility methods
  isValidAddress(address) {
    return ethers.utils.isAddress(address);
  }
  
  async getGasPrice() {
    return await this.provider.getGasPrice();
  }
  
  async estimateGas(transaction) {
    return await this.provider.estimateGas(transaction);
  }
  
  // Price monitoring
  startPriceMonitoring() {
    // Implement price monitoring logic
    // This could involve listening to events or polling external APIs
    console.log('📈 Price monitoring started');
  }
  
  // Event listeners
  subscribeToEvents(callback) {
    if (!this.contract) return;
    
    this.contract.on('TokensPurchased', (buyer, amount, cost, event) => {
      callback('TokensPurchased', {
        buyer,
        amount: ethers.utils.formatEther(amount),
        cost: ethers.utils.formatEther(cost),
        transactionHash: event.transactionHash
      });
    });
    
    this.contract.on('Staked', (user, amount, event) => {
      callback('Staked', {
        user,
        amount: ethers.utils.formatEther(amount),
        transactionHash: event.transactionHash
      });
    });
    
    this.contract.on('Unstaked', (user, amount, event) => {
      callback('Unstaked', {
        user,
        amount: ethers.utils.formatEther(amount),
        transactionHash: event.transactionHash
      });
    });
    
    this.contract.on('RewardsClaimed', (user, amount, event) => {
      callback('RewardsClaimed', {
        user,
        amount: ethers.utils.formatEther(amount),
        transactionHash: event.transactionHash
      });
    });
  }
}

module.exports = new BlockchainService();

