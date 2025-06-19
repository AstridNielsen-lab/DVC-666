const { run } = require("hardhat");
const fs = require('fs');
const path = require('path');
require("dotenv").config();

async function verifyContract(networkName, contractAddress) {
  console.log(`\n🔍 Verifying DVC666 contract on ${networkName}...`);
  console.log(`Contract Address: ${contractAddress}`);
  
  try {
    // Verify the contract
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [], // DVC666 constructor has no arguments
    });
    
    console.log(`✅ Contract verified successfully!`);
    
    // Update deployment file with verification status
    const deploymentPath = path.join(__dirname, `../deployments/${networkName}-deployment.json`);
    if (fs.existsSync(deploymentPath)) {
      const deployment = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
      deployment.verified = true;
      deployment.verifiedAt = new Date().toISOString();
      fs.writeFileSync(deploymentPath, JSON.stringify(deployment, null, 2));
      console.log(`📄 Updated deployment file with verification status`);
    }
    
    // Show explorer links
    const explorerUrls = {
      mainnet: `https://etherscan.io/address/${contractAddress}#code`,
      goerli: `https://goerli.etherscan.io/address/${contractAddress}#code`,
      sepolia: `https://sepolia.etherscan.io/address/${contractAddress}#code`,
      bsc: `https://bscscan.com/address/${contractAddress}#code`,
      bscTestnet: `https://testnet.bscscan.com/address/${contractAddress}#code`,
      polygon: `https://polygonscan.com/address/${contractAddress}#code`,
      mumbai: `https://mumbai.polygonscan.com/address/${contractAddress}#code`,
      arbitrum: `https://arbiscan.io/address/${contractAddress}#code`,
      avalanche: `https://snowtrace.io/address/${contractAddress}#code`
    };
    
    if (explorerUrls[networkName]) {
      console.log(`\n🔗 Verified contract: ${explorerUrls[networkName]}`);
    }
    
    return true;
    
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log(`✅ Contract is already verified!`);
      return true;
    } else {
      console.error(`❌ Verification failed:`, error.message);
      return false;
    }
  }
}

async function verifyAllDeployments() {
  console.log(`🔍 Starting batch verification of all deployments...`);
  
  const deploymentsDir = path.join(__dirname, '../deployments');
  if (!fs.existsSync(deploymentsDir)) {
    console.log(`⚠️  No deployments directory found`);
    return;
  }
  
  const files = fs.readdirSync(deploymentsDir)
    .filter(file => file.endsWith('-deployment.json'))
    .filter(file => !file.includes('liquidity'));
  
  if (files.length === 0) {
    console.log(`⚠️  No deployment files found`);
    return;
  }
  
  for (const file of files) {
    const networkName = file.replace('-deployment.json', '');
    const deploymentPath = path.join(deploymentsDir, file);
    const deployment = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
    
    if (deployment.verified) {
      console.log(`✅ ${networkName}: Already verified`);
      continue;
    }
    
    console.log(`\n🔄 Verifying ${networkName}...`);
    const success = await verifyContract(networkName, deployment.contractAddress);
    
    if (success) {
      console.log(`✅ ${networkName}: Verification completed`);
    } else {
      console.log(`❌ ${networkName}: Verification failed`);
    }
    
    // Delay between verifications to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log(`\n🎉 Batch verification completed!`);
}

async function main() {
  const networkName = hre.network.name;
  const contractAddress = process.env.CONTRACT_ADDRESS;
  
  if (process.argv.includes('--all')) {
    await verifyAllDeployments();
    return;
  }
  
  if (!contractAddress) {
    // Try to load from deployment file
    const deploymentPath = path.join(__dirname, `../deployments/${networkName}-deployment.json`);
    if (fs.existsSync(deploymentPath)) {
      const deployment = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
      const success = await verifyContract(networkName, deployment.contractAddress);
      process.exitCode = success ? 0 : 1;
    } else {
      console.error(`❌ CONTRACT_ADDRESS not set and no deployment file found for ${networkName}`);
      console.log(`Usage: npx hardhat run scripts/verify-contract.js --network ${networkName}`);
      console.log(`Or: npx hardhat run scripts/verify-contract.js --network ${networkName} -- --all`);
      process.exitCode = 1;
    }
  } else {
    const success = await verifyContract(networkName, contractAddress);
    process.exitCode = success ? 0 : 1;
  }
}

// Execute if called directly
if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = { verifyContract, verifyAllDeployments };

