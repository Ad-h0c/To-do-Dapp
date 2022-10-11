/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("dotenv").config();

const {
  PRIVATE_KEY,
  REACT_APP_ALCHEMY_API_KEY,
  YOUR_ETHERSCAN_API_KEY,
  QUICKNODE_API_KEY,
} = process.env;

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${REACT_APP_ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    bsctest: {
      url: `https://radial-wispy-dinghy.bsc-testnet.discover.quiknode.pro/${QUICKNODE_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: YOUR_ETHERSCAN_API_KEY,
  },
};
