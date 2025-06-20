const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  console.log("🔥 Starting DVC666 deployment...");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log(`📋 Deploying with account: ${deployer.address}`);
  
  // Check balance
  const balance = await deployer.getBalance();
  console.log(`💰 Account balance: ${ethers.utils.formatEther(balance)} ETH`);
  
  if (balance.lt(ethers.utils.parseEther("0.01"))) {
    console.warn("⚠️  Warning: Low balance detected");
  }
  
  // Get the contract factory
  console.log("📦 Getting DVC666 contract factory...");
  const DVC666 = await ethers.getContractFactory("DVC666");
  
  // Deploy the contract
  console.log("🚀 Deploying DVC666 contract...");
  const dvc666 = await DVC666.deploy(deployer.address);
  
  console.log("⏳ Waiting for deployment confirmation...");
  await dvc666.deployed();
  
  console.log("\n🎉 DVC666 Contract deployed successfully!");
  console.log(`📍 Contract address: ${dvc666.address}`);
  console.log(`🔗 Transaction hash: ${dvc666.deployTransaction.hash}`);
  
  // Get network info
  const network = await ethers.provider.getNetwork();
  console.log(`🌐 Network: ${network.name} (Chain ID: ${network.chainId})`);
  
  // Wait a few blocks for confirmation
  console.log("⏳ Waiting for block confirmations...");
  await dvc666.deployTransaction.wait(3);
  
  // Verify initial state
  console.log("\n📊 Verifying initial contract state:");
  
  const name = await dvc666.name();
  const symbol = await dvc666.symbol();
  const totalSupply = await dvc666.totalSupply();
  const decimals = await dvc666.decimals();
  const owner = await dvc666.owner();
  const presalePrice = await dvc666.PRESALE_PRICE();
  
  console.log(`   Token Name: ${name}`);
  console.log(`   Token Symbol: ${symbol}`);
  console.log(`   Decimals: ${decimals}`);
  console.log(`   Total Supply: ${ethers.utils.formatEther(totalSupply)} DVC666`);
  console.log(`   Owner: ${owner}`);
  console.log(`   Presale Price: ${ethers.utils.formatEther(presalePrice)} ETH per token`);
  
  // Start presale automatically
  console.log("\n🔥 Starting presale...");
  const presaleDuration = 30 * 24 * 60 * 60; // 30 days
  const startPresaleTx = await dvc666.startPresale(presaleDuration);
  await startPresaleTx.wait();
  console.log("✅ Presale started successfully!");
  
  // Enable trading
  console.log("🔄 Enabling trading...");
  const enableTradingTx = await dvc666.enableTrading();
  await enableTradingTx.wait();
  console.log("✅ Trading enabled successfully!");
  
  // Save deployment info
  const deploymentInfo = {
    network: network.name,
    chainId: network.chainId,
    contractAddress: dvc666.address,
    transactionHash: dvc666.deployTransaction.hash,
    deployerAddress: deployer.address,
    blockNumber: dvc666.deployTransaction.blockNumber,
    gasUsed: dvc666.deployTransaction.gasLimit.toString(),
    timestamp: new Date().toISOString(),
    presaleActive: true,
    tradingEnabled: true
  };
  
  console.log("\n💾 Deployment Information:");
  console.log(JSON.stringify(deploymentInfo, null, 2));
  
  // Write to file for frontend
  const fs = require('fs');
  const path = require('path');
  
  // Create deployment info file
  const deploymentPath = path.join(__dirname, '../deployments');
  if (!fs.existsSync(deploymentPath)) {
    fs.mkdirSync(deploymentPath, { recursive: true });
  }
  
  const filename = `deployment-${network.chainId}-${Date.now()}.json`;
  fs.writeFileSync(
    path.join(deploymentPath, filename),
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  // Update latest deployment
  fs.writeFileSync(
    path.join(deploymentPath, 'latest.json'),
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log(`📁 Deployment info saved to: ${filename}`);
  
  // Update frontend contract config
  const frontendContractPath = path.join(__dirname, '../../frontend/src/contracts/contracts.js');
  if (fs.existsSync(frontendContractPath)) {
    console.log("🔄 Updating frontend contract configuration...");
    
    let contractConfig = fs.readFileSync(frontendContractPath, 'utf8');
    
    // Update the contract address for the current network
    const addressPattern = new RegExp(`(${network.chainId}:\s*["\']).*(["\']),?`, 'g');
    contractConfig = contractConfig.replace(
      addressPattern, 
      `$1${dvc666.address}$2,`
    );
    
    // If localhost deployment, also update default
    if (network.chainId === 1337) {
      const defaultPattern = /DEFAULT_CONTRACT_ADDRESS = process\.env\.REACT_APP_CONTRACT_ADDRESS \|\| CONTRACT_ADDRESSES\[1337\]/;
      contractConfig = contractConfig.replace(
        defaultPattern,
        `DEFAULT_CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || "${dvc666.address}"`
      );
    }
    
    fs.writeFileSync(frontendContractPath, contractConfig);
    console.log("✅ Frontend contract configuration updated!");
  }
  
  console.log("\n🎯 Next Steps:");
  console.log("1. Update your .env file with the contract address");
  console.log("2. Verify the contract on Etherscan (if on mainnet/testnet)");
  console.log("3. Add liquidity to DEX");
  console.log("4. Start marketing the presale");
  
  if (network.chainId !== 1337) {
    console.log("\n🔍 To verify on Etherscan:");
    console.log(`npx hardhat verify --network ${network.name} ${dvc666.address} ${deployer.address}`);
  }
  
  console.log("\n🔥 DVC666 is ready to conquer the crypto world! 🔥");
}

// Error handling
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });

