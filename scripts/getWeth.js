const { ethers, getNamedAccounts, network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")

const AMOUNT = ethers.utils.parseEther('0.02')

async function getWeth() {
    const { deployer } = await getNamedAccounts()
    // Ici utiliser l'interface ne nous permettra pas d'utiliser toutes 
    // les fonctionnalités mais nous donnera l'ABI.
    // Adresse WETH mainnet : 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    // Ici nous récupérons le Weth contract avec l'ABI de IWeth, à une certaine 
    // adresse connecté au déployer.
    const iWeth = await ethers.getContractAt(
        "IWeth", 
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        deployer
    )
    const tx = await iWeth.deposit({ 
        value: AMOUNT 
    })
    await tx.wait(1)

    const wethBalance = await iWeth.balanceOf(deployer)
    console.log(`Weth balance : ${wethBalance.toString()}`)
}

module.exports = {
    getWeth, AMOUNT
}