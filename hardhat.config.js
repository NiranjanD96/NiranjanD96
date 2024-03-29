require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan"); 

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.8",
  networks: {
    hardhat: {
      accounts: {
        mnemonic: process.env.GOERLI_MNEMONIC,
      },
    },

    goerli: {
      chainId: 5,
      url: process.env.GOERLI_APIURL,
      accounts: {
        mnemonic: process.env.GOERLI_MNEMONIC,
      },
    },
  },
  etherscan: {
    apiKey: process.env.GOERLI_ETHERSCAN,
  },
};
