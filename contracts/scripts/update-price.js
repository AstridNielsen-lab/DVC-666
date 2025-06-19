const { ethers } = require("hardhat");
require("dotenv").config();

// Contract address and ABI
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS; // Add your deployed contract address
const NEW_PRICE = "0.00010382"; // New price in ETH

async function main() {
  console.log("🔥 Updating DVC666 token price...");
  
  if (!CONTRACT_ADDRESS) {
    console.error("❌ Please set CONTRACT_ADDRESS environment variable");
    process.exit(1);
  }
  
  // Get the deployer account (must be owner)
  const [deployer] = await ethers.getSigners();
  console.log("Updating with account:", deployer.address);
  console.log("Account balance:", ethers.utils.formatEther(await deployer.getBalance()));
  
  // Connect to the deployed contract
  const DevilsCoin = await ethers.getContractFactory("DevilsCoin");
  const devilsCoin = DevilsCoin.attach(CONTRACT_ADDRESS);
  
  try {
    // Check current owner
    const owner = await devilsCoin.owner();
    console.log("Contract owner:", owner);
    
    if (owner.toLowerCase() !== deployer.address.toLowerCase()) {
      console.error("❌ You are not the owner of this contract");
      process.exit(1);
    }
    
    // Get current price
    const presaleInfo = await devilsCoin.getPresaleInfo();
    const currentPrice = ethers.utils.formatEther(presaleInfo.price);
    console.log("\n📊 Current price:", currentPrice, "ETH per DVC666");
    console.log("🎯 New price:", NEW_PRICE, "ETH per DVC666");
    
    // Update the price
    console.log("\n⏳ Updating price...");
    const tx = await devilsCoin.setPresalePrice(ethers.utils.parseEther(NEW_PRICE));
    console.log("Transaction hash:", tx.hash);
    
    // Wait for confirmation
    const receipt = await tx.wait();
    console.log("✅ Price updated successfully!");
    console.log("Block number:", receipt.blockNumber);
    
    // Verify the update
    const updatedPresaleInfo = await devilsCoin.getPresaleInfo();
    const newPrice = ethers.utils.formatEther(updatedPresaleInfo.price);
    console.log("\n🔍 Verified new price:", newPrice, "ETH per DVC666");
    
    // Show updated MetaMask info
    console.log("\n🦊 MetaMask Integration Info:");
    console.log("Contract Address:", CONTRACT_ADDRESS);
    console.log("Token Name: DVC666 Coin");
    console.log("Symbol: DVC666");
    console.log("Decimals: 18");
    console.log("New Price:", newPrice, "ETH per DVC666");
    
  } catch (error) {
    console.error("❌ Failed to update price:", error.message);
    if (error.message.includes("Ownable: caller is not the owner")) {
      console.error("You need to be the contract owner to update the price");
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("❌ Script failed:", error);
  process.exitCode = 1;
});

