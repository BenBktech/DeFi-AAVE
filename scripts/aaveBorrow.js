const { getNamedAccounts } = require('hardhat');
const { getWeth, AMOUNT } = require('../scripts/getWeth')

async function main() {
  await getWeth()
  const { deployer } = await getNamedAccounts()
  const lendingPool = await getLendingPool(deployer)
  console.log(lendingPool.address)

  // deposit 
  // L'adresse vient du "getWeth", c'est l'adresse de Weth
  const wethTokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  await approveERC20(wethTokenAddress, lendingPool.address, AMOUNT, deployer)
  console.log('Depositing...')
  await lendingPool.deposit(wethTokenAddress, AMOUNT, deployer, 0)
  console.log('Deposited')
}

async function approveERC20(contractAddress, spenderAddress, amountToSpend, account) {
  const erc20Token = await ethers.getContractAt("IERC20", contractAddress, account)
  const tx = await erc20Token.approve(spenderAddress, amountToSpend)
  await tx.wait(1)
  console.log('approved')
}

async function getLendingPool(account) {
  const lendingPoolAddressProvider = await ethers.getContractAt(
    "ILendingPoolAddressesProvider",
    "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
    account
  )
  const lendingPoolAddress = await lendingPoolAddressProvider.getLendingPool()
  const lendingPool = await ethers.getContractAt(
    "ILendingPool",
    lendingPoolAddress,
    account
  )
  return lendingPool;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
