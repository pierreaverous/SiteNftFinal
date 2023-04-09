require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  paths: {
    artifacts:'./src/artifacts'
  },
  networks:{
    ropsten: {
      url: "https://sepolia.infura.io/v3/5ee3592efc5842d2be9c15f5b920f0ac",
      accounts: ['0x98c052d080b19d1877b03a5e9757774d994f89d68a1c1c3a93c53d47a4fa9625']
    }
  }
};
