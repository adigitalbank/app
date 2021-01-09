const ZToken = artifacts.require('ZToken.sol')
const yZToken = artifacts.require('yZToken.sol')
//const SushiBar = artifacts.require('SushiBar.sol')
const MasterChef = artifacts.require('MasterChef.sol')

module.exports = async function(deployer) {
  // Deploy Z Token
  await deployer.deploy(ZToken)
  const zToken = await ZToken.deployed()
  // Send some test tokens to dev *add as needed*
  //await zToken.mint('0x...F76A', web3.utils.toBN(10000))

  // deploy staking token reward token
  await deployer.deploy(yZToken, zToken.address)
  //const yzToken = await yzToken.deployed()
  //yzToken.mint('0x...F76A', web3.utils.toBN(10000))

  // Deploy Masterchef Contract
  await deployer.deploy(
    MasterChef,
    zToken.address,
    process.env.DEV_ADDRESS, // Your address where you get tokens - should be a multisig
    web3.utils.toWei(process.env.TOKENS_PER_BLOCK), // Number of tokens rewarded per block, e.g., 100
    process.env.START_BLOCK, // Block number when token mining starts
    process.env.BONUS_END_BLOCK // Block when bonus ends
  )

  // Make Masterchef contract token owner
  const masterChef = await MasterChef.deployed()
  await zToken.transferOwnership(masterChef.address)

  // Add Liquidity pool for rewards, e.g., "ETH/DAI Pool"
  await masterChef.add(
    process.env.ALLOCATION_POINT,
    process.env.LP_TOKEN_ADDRESS,
    false
  )

  // Add more liquidity pools here upon deployment, or add them later manually

}
