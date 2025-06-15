require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
      blockGasLimit: 10000000,
      gas: 10000000,
      gasPrice: 1000000000, // 1 gwei
      mining: {
        auto: true,
        interval: 13000 // 13 seconds block time
      }
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
      gas: 10000000,
      gasPrice: 1000000000
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 5,
    },
    mainnet: {
      url: process.env.MAINNET_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1,
    },
    // Custom Devil's Chain (PoS)
    devilschain: {
      url: process.env.DEVILS_CHAIN_RPC || "http://localhost:8546",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 66666,
      gas: 10000000,
      gasPrice: 1000000000
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
};

