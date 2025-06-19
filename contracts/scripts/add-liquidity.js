const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');
require("dotenv").config();

// Router addresses para diferentes redes
const ROUTERS = {
  mainnet: {
    uniswap: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    sushiswap: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F"
  },
  bsc: {
    pancakeswap: "0x10ED43C718714eb63d5aA57B78B54704E256024E"
  },
  polygon: {
    quickswap: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
    sushiswap: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506"
  }
};

// ABI para Uniswap V2 Router
const ROUTER_ABI = [
  "function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external payable returns (uint amountToken, uint amountETH, uint liquidity)",
  "function WETH() external pure returns (address)",
  "function factory() external pure returns (address)"
];

// ABI para ERC20
const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)",
  "function transfer(address to, uint256 amount) external returns (bool)"
];

async function addLiquidity(networkName, routerType = 'uniswap') {
  console.log(`\n💧 Adding liquidity for DVC666 on ${networkName} using ${routerType}...`);
  
  // Load deployment info
  const deploymentPath = path.join(__dirname, `../deployments/${networkName}-deployment.json`);
  if (!fs.existsSync(deploymentPath)) {
    throw new Error(`Deployment file not found for ${networkName}`);
  }
  
  const deployment = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
  const tokenAddress = deployment.contractAddress;
  
  // Get router address
  const routerAddress = ROUTERS[networkName]?.[routerType];
  if (!routerAddress) {
    throw new Error(`Router ${routerType} not available on ${networkName}`);
  }
  
  console.log(`📍 Token Address: ${tokenAddress}`);
  console.log(`📍 Router Address: ${routerAddress}`);
  
  // Get signer
  const [signer] = await ethers.getSigners();
  console.log(`💼 Liquidity Provider: ${signer.address}`);
  
  // Connect to contracts
  const token = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  const router = new ethers.Contract(routerAddress, ROUTER_ABI, signer);
  
  // Check token balance
  const tokenBalance = await token.balanceOf(signer.address);
  console.log(`💰 Token Balance: ${ethers.utils.formatEther(tokenBalance)} DVC666`);
  
  // Check ETH balance
  const ethBalance = await signer.getBalance();
  console.log(`💰 ETH Balance: ${ethers.utils.formatEther(ethBalance)} ETH`);
  
  // Liquidity amounts (configurável)
  const tokenAmount = ethers.utils.parseEther("1000000"); // 1M tokens
  const ethAmount = ethers.utils.parseEther("1"); // 1 ETH
  
  if (tokenBalance.lt(tokenAmount)) {
    throw new Error(`Insufficient token balance. Need ${ethers.utils.formatEther(tokenAmount)} DVC666`);
  }
  
  if (ethBalance.lt(ethAmount.add(ethers.utils.parseEther("0.1")))) {
    throw new Error(`Insufficient ETH balance. Need at least ${ethers.utils.formatEther(ethAmount.add(ethers.utils.parseEther("0.1")))} ETH`);
  }
  
  console.log(`\n⏳ Approving tokens...`);
  
  // Approve tokens
  const approveTx = await token.approve(routerAddress, tokenAmount);
  await approveTx.wait();
  console.log(`✅ Tokens approved`);
  
  console.log(`\n⏳ Adding liquidity...`);
  console.log(`Token Amount: ${ethers.utils.formatEther(tokenAmount)} DVC666`);
  console.log(`ETH Amount: ${ethers.utils.formatEther(ethAmount)} ETH`);
  
  // Add liquidity
  const deadline = Math.floor(Date.now() / 1000) + 1800; // 30 minutes
  const minTokenAmount = tokenAmount.mul(95).div(100); // 5% slippage
  const minEthAmount = ethAmount.mul(95).div(100); // 5% slippage
  
  const liquidityTx = await router.addLiquidityETH(
    tokenAddress,
    tokenAmount,
    minTokenAmount,
    minEthAmount,
    signer.address,
    deadline,
    { value: ethAmount }
  );
  
  console.log(`🚀 Liquidity transaction sent: ${liquidityTx.hash}`);
  
  // Wait for confirmation
  const receipt = await liquidityTx.wait();
  console.log(`✅ Liquidity added successfully!`);
  console.log(`Block: ${receipt.blockNumber}`);
  console.log(`Gas Used: ${receipt.gasUsed.toString()}`);
  
  // Save liquidity info
  const liquidityInfo = {
    network: networkName,
    router: routerType,
    routerAddress,
    tokenAddress,
    tokenAmount: tokenAmount.toString(),
    ethAmount: ethAmount.toString(),
    transactionHash: liquidityTx.hash,
    blockNumber: receipt.blockNumber,
    timestamp: new Date().toISOString(),
    lpProvider: signer.address
  };
  
  const liquidityFile = path.join(__dirname, `../deployments/${networkName}-liquidity-${routerType}.json`);
  fs.writeFileSync(liquidityFile, JSON.stringify(liquidityInfo, null, 2));
  
  console.log(`\n📄 Liquidity info saved to: deployments/${networkName}-liquidity-${routerType}.json`);
  
  // Trading pair info
  console.log(`\n📊 Trading Pair Created:`);
  if (networkName === 'mainnet' && routerType === 'uniswap') {
    console.log(`Uniswap V2: https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${tokenAddress}`);
    console.log(`Info: https://info.uniswap.org/pair/${tokenAddress}`);
  } else if (networkName === 'bsc' && routerType === 'pancakeswap') {
    console.log(`PancakeSwap: https://pancakeswap.finance/swap?outputCurrency=${tokenAddress}`);
    console.log(`Info: https://pancakeswap.info/token/${tokenAddress}`);
  } else if (networkName === 'polygon' && routerType === 'quickswap') {
    console.log(`QuickSwap: https://quickswap.exchange/#/swap?outputCurrency=${tokenAddress}`);
  }
  
  return liquidityInfo;
}

async function main() {
  const networkName = hre.network.name;
  const routerType = process.env.ROUTER_TYPE || 'uniswap';
  
  try {
    await addLiquidity(networkName, routerType);
    console.log(`\n🎉 Liquidity addition completed!`);
    console.log(`🚀 DVC666 is now tradeable on ${routerType}!`);
    
  } catch (error) {
    console.error(`\n❌ Liquidity addition failed:`, error.message);
    process.exitCode = 1;
  }
}

// Execute if called directly
if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = { addLiquidity, ROUTERS };

