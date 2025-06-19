require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: process.env.ENABLE_OPTIMIZER === "true",
        runs: parseInt(process.env.OPTIMIZER_RUNS) || 200,
        details: {
          yul: true,
          yulDetails: {
            stackAllocation: true,
            optimizerSteps: "dhfoDgvulfnTUtnIf"
          }
        }
      },
      metadata: {
        bytecodeHash: "none"
      }
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
      blockGasLimit: 30000000,
      gas: 30000000,
      gasPrice: 1000000000,
      mining: {
        auto: true,
        interval: 13000
      },
      forking: {
        url: process.env.MAINNET_RPC_URL,
        enabled: false
      }
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
      gas: 30000000,
      gasPrice: 1000000000
    },
    // ETHEREUM MAINNET
    mainnet: {
      url: process.env.MAINNET_RPC_URL,
      accounts: (process.env.PRIVATE_KEY && process.env.PRIVATE_KEY !== "your_private_key_here") ? [process.env.PRIVATE_KEY] : [],
      chainId: 1,
      gasPrice: parseInt(process.env.GAS_PRICE_GWEI) * 1000000000 || 20000000000,
      gas: 6000000,
      timeout: 300000
    },
    // ETHEREUM TESTNETS
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: (process.env.PRIVATE_KEY && process.env.PRIVATE_KEY !== "your_private_key_here") ? [process.env.PRIVATE_KEY] : [],
      chainId: 5,
      gasPrice: 20000000000,
      gas: 6000000
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: (process.env.PRIVATE_KEY && process.env.PRIVATE_KEY !== "your_private_key_here") ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
      gasPrice: 20000000000,
      gas: 6000000
    },
    // BINANCE SMART CHAIN
    bsc: {
      url: process.env.BSC_RPC_URL,
      accounts: (process.env.PRIVATE_KEY && process.env.PRIVATE_KEY !== "your_private_key_here") ? [process.env.PRIVATE_KEY] : [],
      chainId: 56,
      gasPrice: 5000000000, // 5 gwei
      gas: 6000000
    },
    bscTestnet: {
      url: process.env.BSC_TESTNET_RPC_URL,
      accounts: (process.env.PRIVATE_KEY && process.env.PRIVATE_KEY !== "your_private_key_here") ? [process.env.PRIVATE_KEY] : [],
      chainId: 97,
      gasPrice: 10000000000,
      gas: 6000000
    },
    // POLYGON
    polygon: {
      url: process.env.POLYGON_RPC_URL,
      accounts: (process.env.PRIVATE_KEY && process.env.PRIVATE_KEY !== "your_private_key_here") ? [process.env.PRIVATE_KEY] : [],
      chainId: 137,
      gasPrice: 30000000000, // 30 gwei
      gas: 6000000
    },
    mumbai: {
      url: process.env.POLYGON_MUMBAI_RPC_URL,
      accounts: (process.env.PRIVATE_KEY && process.env.PRIVATE_KEY !== "your_private_key_here") ? [process.env.PRIVATE_KEY] : [],
      chainId: 80001,
      gasPrice: 30000000000,
      gas: 6000000
    },
    // ARBITRUM
    arbitrum: {
      url: process.env.ARBITRUM_RPC_URL,
      accounts: (process.env.PRIVATE_KEY && process.env.PRIVATE_KEY !== "your_private_key_here") ? [process.env.PRIVATE_KEY] : [],
      chainId: 42161,
      gasPrice: 1000000000, // 1 gwei
      gas: 30000000
    },
    // AVALANCHE
    avalanche: {
      url: process.env.AVALANCHE_RPC_URL,
      accounts: (process.env.PRIVATE_KEY && process.env.PRIVATE_KEY !== "your_private_key_here") ? [process.env.PRIVATE_KEY] : [],
      chainId: 43114,
      gasPrice: 25000000000, // 25 gwei
      gas: 8000000
    }
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
      bsc: process.env.BSCSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY
    },
    customChains: [
      {
        network: "arbitrum",
        chainId: 42161,
        urls: {
          apiURL: "https://api.arbiscan.io/api",
          browserURL: "https://arbiscan.io"
        }
      }
    ]
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
    gasPrice: 20,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    token: "ETH",
    gasPriceApi: "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",
    showTimeSpent: true,
    showMethodSig: true,
    onlyCalledMethods: false
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true
  },
  mocha: {
    timeout: 300000
  }
};

