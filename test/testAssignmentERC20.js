const {expect} = require("chai");
const {ethers} = require("hardhat");

describe ("Test AssignmentERC20", ()=>{
    let accounts;
    let NI;

    beforeEach(async () => {
        accounts = await ethers.getSigners();
        let factory = await ethers.getContractFactory("AssignmentERC20");
        
        NI = await factory.deploy(
            "Assignment ERC20 token",
            "NI",
            accounts[0].address
        );
    });

    it ("Account 0 can mint token", async ()=>{
        const before = await NI.balanceOf(accounts[1].address);
        const response = await NI.mint(accounts[1].address, 100);
        await response.wait();

        //Assert
        const after = await NI.balanceOf(accounts[1].address);
        expect (before.add(100).toNumber()).equals(after.toNumber());
    });

    it ("Account 1 cannot mint token", async ()=>{
        try {
            await NI.connect(accounts[1]).mint(accounts[1].address, 100);
        } catch (err){
            expect (err.toString().includes("Ownable: caller is not the owner"));
        }
    });

    it ("can mint after transferOwnership", async() => {
        const before = await NI.balanceOf(accounts[1].address);
        await NI.transferOwnership(accounts[1].address);

        const response = await NI
            .connect(accounts[1])
            .mint(accounts[1].address, 100);

        await response.wait()

        //Assert
        const after = await NI.balanceOf(accounts[1].address);
        expect (before.add(100).toNumber()).equals(after.toNumber());
    });
});
