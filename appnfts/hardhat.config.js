require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  paths: {
    artifacts:'./src/artifacts'
  },
  networks:{
    mainnet: {
      url: "https://mainnet.infura.io/v3/5ee3592efc5842d2be9c15f5b920f0ac",
      accounts: ['0xbd9401c0f998b9c39807cb2ebc01d69bb81b08fb22a285ff1539a125d8b7279d']
    }
  }
};

