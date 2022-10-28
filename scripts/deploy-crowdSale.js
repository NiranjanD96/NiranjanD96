const { ethers } = require("hardhat");

(async () => {
    // get accounts
    const accounts = await ethers.getSigners();

    // token contract address
    const contractAddr = '0xB80f99e0B3a18636f63c79B7Eb0FdF536FDf9cD1';
    // get the contract
    const factory = await ethers.getContractFactory("Crowdsale");

    const crowdSale = await factory.deploy (contractAddr, 100, accounts[0].address);

    console.log("crowdSale contract address:", crowdSale.address);
    
})().catch((err)=>console.error(err));