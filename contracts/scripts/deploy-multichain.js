const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');
require("dotenv").config();

// Configurações de rede
const NETWORK_CONFIG = {
  mainnet: {
    name: "Ethereum Mainnet",
    explorer: "https://etherscan.io",
    currency: "ETH",
    chainId: 1
  },
  bsc: {
    name: "Binance Smart Chain",
    explorer: "https://bscscan.com",
    currency: "BNB",
    chainId: 56
  },
  polygon: {
    name: "Polygon",
    explorer: "https://polygonscan.com",
    currency: "MATIC",
    chainId: 137
  },
  arbitrum: {
    name: "Arbitrum One",
    explorer: "https://arbiscan.io",
    currency: "ETH",
    chainId: 42161
  },
  avalanche: {
    name: "Avalanche C-Chain",
    explorer: "https://snowtrace.io",
    currency: "AVAX",
    chainId: 43114
  }
};

async function deployToNetwork(networkName) {
  console.log(`\n🔥 Deploying DVC666 Coin to ${NETWORK_CONFIG[networkName]?.name || networkName}...`);
  
  // Get network info
  const network = await ethers.provider.getNetwork();
  console.log(`📡 Connected to chain ID: ${network.chainId}`);
  
  // Get deployer
  const [deployer] = await ethers.getSigners();
  console.log(`🏗️  Deployer address: ${deployer.address}`);
  
  // Check balance
  const balance = await deployer.getBalance();
  console.log(`💰 Deployer balance: ${ethers.utils.formatEther(balance)} ${NETWORK_CONFIG[networkName]?.currency || 'ETH'}`);
  
  // Deploy contract
  console.log(`\n⏳ Deploying contract...`);
  const DevilsCoin = await ethers.getContractFactory("DevilsCoin");
  const devilsCoin = await DevilsCoin.deploy();
  
  console.log(`🚀 Deployment transaction sent: ${devilsCoin.deployTransaction.hash}`);
  
  // Wait for deployment
  await devilsCoin.deployed();
  
  console.log(`\n✅ DVC666 Coin deployed successfully!`);
  console.log(`📍 Contract address: ${devilsCoin.address}`);
  console.log(`🔗 Transaction hash: ${devilsCoin.deployTransaction.hash}`);
  
  // Verify contract details
  const name = await devilsCoin.name();
  const symbol = await devilsCoin.symbol();
  const decimals = await devilsCoin.decimals();
  const totalSupply = await devilsCoin.totalSupply();
  const presaleInfo = await devilsCoin.getPresaleInfo();
  
  console.log(`\n📊 Contract Details:`);
  console.log(`Name: ${name}`);
  console.log(`Symbol: ${symbol}`);
  console.log(`Decimals: ${decimals}`);
  console.log(`Total Supply: ${ethers.utils.formatEther(totalSupply)} ${symbol}`);
  console.log(`Presale Price: ${ethers.utils.formatEther(presaleInfo.price)} ${NETWORK_CONFIG[networkName]?.currency || 'ETH'}`);
  console.log(`Presale Active: ${presaleInfo.active}`);
  
  // Save deployment info
  const deploymentInfo = {
    network: networkName,
    chainId: network.chainId,
    contractAddress: devilsCoin.address,
    deployerAddress: deployer.address,
    transactionHash: devilsCoin.deployTransaction.hash,
    blockNumber: devilsCoin.deployTransaction.blockNumber,
    timestamp: new Date().toISOString(),
    explorerUrl: `${NETWORK_CONFIG[networkName]?.explorer}/address/${devilsCoin.address}`,
    contractDetails: {
      name,
      symbol,
      decimals: decimals.toString(),
      totalSupply: totalSupply.toString(),
      presalePrice: presaleInfo.price.toString(),
      presaleActive: presaleInfo.active
    },
    gasUsed: devilsCoin.deployTransaction.gasLimit?.toString(),
    gasPrice: devilsCoin.deployTransaction.gasPrice?.toString()
  };
  
  // Create deployments directory
  const deploymentsDir = path.join(__dirname, '../deployments');
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }
  
  // Save deployment file
  const deploymentFile = path.join(deploymentsDir, `${networkName}-deployment.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  
  console.log(`\n📄 Deployment info saved to: deployments/${networkName}-deployment.json`);
  
  // MetaMask integration info
  console.log(`\n🦊 MetaMask Integration:`);
  console.log(`Contract Address: ${devilsCoin.address}`);
  console.log(`Token Name: ${name}`);
  console.log(`Symbol: ${symbol}`);
  console.log(`Decimals: ${decimals}`);
  console.log(`Explorer: ${NETWORK_CONFIG[networkName]?.explorer}/address/${devilsCoin.address}`);
  
  // Verification info
  if (process.env.VERIFY_CONTRACT === "true" && NETWORK_CONFIG[networkName]) {
    console.log(`\n🔍 To verify the contract, run:`);
    console.log(`npx hardhat verify --network ${networkName} ${devilsCoin.address}`);
  }
  
  // Liquidity pool info
  console.log(`\n💧 Next Steps - Add Liquidity:`);
  if (networkName === 'mainnet') {
    console.log(`Uniswap V2: https://app.uniswap.org/#/add/v2/ETH/${devilsCoin.address}`);
  } else if (networkName === 'bsc') {
    console.log(`PancakeSwap: https://pancakeswap.finance/add/BNB/${devilsCoin.address}`);
  } else if (networkName === 'polygon') {
    console.log(`QuickSwap: https://quickswap.exchange/#/add/MATIC/${devilsCoin.address}`);
  }
  
  return deploymentInfo;
}

async function main() {
  const networkName = hre.network.name;
  
  try {
    const deploymentInfo = await deployToNetwork(networkName);
    
    // Update .env file with contract address
    const envPath = path.join(__dirname, '../.env');
    if (fs.existsSync(envPath)) {
      let envContent = fs.readFileSync(envPath, 'utf8');
      
      // Update contract address
      if (envContent.includes('CONTRACT_ADDRESS=""')) {
        envContent = envContent.replace('CONTRACT_ADDRESS=""', `CONTRACT_ADDRESS="${deploymentInfo.contractAddress}"`);
      } else if (envContent.includes('CONTRACT_ADDRESS=')) {
        envContent = envContent.replace(/CONTRACT_ADDRESS=.*/, `CONTRACT_ADDRESS="${deploymentInfo.contractAddress}"`);
      } else {
        envContent += `\nCONTRACT_ADDRESS="${deploymentInfo.contractAddress}"`;
      }
      
      fs.writeFileSync(envPath, envContent);
      console.log(`\n📝 Updated .env file with contract address`);
    }
    
    console.log(`\n🎉 Deployment completed successfully!`);
    console.log(`🚀 DVC666 Coin is ready for trading on ${NETWORK_CONFIG[networkName]?.name || networkName}!`);
    
  } catch (error) {
    console.error(`\n❌ Deployment failed:`, error);
    process.exitCode = 1;
  }
}

// Execute deployment
if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = { deployToNetwork, NETWORK_CONFIG };

