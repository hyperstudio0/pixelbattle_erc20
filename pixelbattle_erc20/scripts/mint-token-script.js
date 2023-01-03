const hre = require("hardhat");
require('dotenv').config();
const METADATA_CID = process.env.METADATA_CID;

const ownerAddress = "0x373FC56C1b62a4B2d287d305740967ac819a064F";
const toAddress = ownerAddress;

async function main() {

    const NFT = await hre.ethers.getContractFactory("PixelBattle_ERC20");
    const CONTRACT_ADDRESS = "0x562f7c74ab19457C21e6ad4E1dEC6FB2A8E9e613";

    const contract = NFT.attach(CONTRACT_ADDRESS);
    const accounts = await hre.ethers.getSigners();
    for (const account of accounts) {
        console.log(account.address, 'account.address');
    }
    // await contract.mint('0x373FC56C1b62a4B2d287d305740967ac819a064F', 1000000000000000); // 1000000000000000000000
    console.log(await hre.ethers.BigNumber.from(1000 * 10^18), '1000 * 10^18');
    await contract.mint('0x373FC56C1b62a4B2d287d305740967ac819a064F', await hre.ethers.BigNumber.from(1000 * 10^18)); // 1000000000000000000000
    console.log(await contract.balanceOf('0x373FC56C1b62a4B2d287d305740967ac819a064F'), ": Balance");

}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});