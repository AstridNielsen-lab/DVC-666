const { ethers } = require("hardhat");

async function main() {
  console.log("🔥 Deploying Devil's Coin 666 (DVC666) Contract...");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy the contract
  const DevilsCoin = await ethers.getContractFactory("DevilsCoin");
  const devilsCoin = await DevilsCoin.deploy();
  
  await devilsCoin.deployed();
  
  console.log("\n🎯 Devil's Coin 666 deployed to:", devilsCoin.address);
  console.log("📊 Transaction hash:", devilsCoin.deployTransaction.hash);
  
  // Verify deployment
  const totalSupply = await devilsCoin.totalSupply();
  const name = await devilsCoin.name();
  const symbol = await devilsCoin.symbol();
  const decimals = await devilsCoin.decimals();
  
  console.log("\n📈 Contract Details:");
  console.log("Name:", name);
  console.log("Symbol:", symbol);
  console.log("Decimals:", decimals);
  console.log("Total Supply:", ethers.utils.formatEther(totalSupply), "DVC666");
  console.log("Owner:", await devilsCoin.owner());
  
  // Get presale info
  const presaleInfo = await devilsCoin.getPresaleInfo();
  const minMaxPurchase = await devilsCoin.getMinMaxPurchase();
  console.log("\n💰 Presale Info:");
  console.log("Price:", ethers.utils.formatEther(presaleInfo.price), "ETH per DVC666");
  console.log("Remaining:", ethers.utils.formatEther(presaleInfo.remaining), "DVC666");
  console.log("Progress:", await devilsCoin.getPresaleProgress(), "%");
  console.log("Active:", presaleInfo.active);
  console.log("Min Purchase:", ethers.utils.formatEther(minMaxPurchase.min), "ETH");
  console.log("Max Purchase:", ethers.utils.formatEther(minMaxPurchase.max), "ETH");
  
  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    contractAddress: devilsCoin.address,
    deployerAddress: deployer.address,
    transactionHash: devilsCoin.deployTransaction.hash,
    blockNumber: devilsCoin.deployTransaction.blockNumber,
    timestamp: new Date().toISOString(),
    contractDetails: {
      name,
      symbol,
      decimals,
      totalSupply: totalSupply.toString()
    }
  };
  
  const fs = require('fs');
  const path = require('path');
  const deploymentsDir = path.join(__dirname, '../deployments');
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(deploymentsDir, `${hre.network.name}-deployment.json`),
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("\n✅ Deployment completed successfully!");
  console.log("📄 Deployment info saved to:", `deployments/${hre.network.name}-deployment.json`);
  
  // MetaMask integration info
  console.log("\n🦊 MetaMask Integration:");
  console.log("Contract Address:", devilsCoin.address);
  console.log("Symbol: DVC666");
  console.log("Decimals: 18");
  console.log("\n💸 Ready for Presale!");
  console.log("Presale is ACTIVE and ready to accept purchases");
  console.log("Price: 0.00010382 ETH per DVC666 token");
  
  // Verification instructions
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("\n🔍 To verify the contract, run:");
    console.log(`npx hardhat verify --network ${hre.network.name} ${devilsCoin.address}`);
  }
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});

