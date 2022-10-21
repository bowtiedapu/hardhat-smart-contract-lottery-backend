const { devChains } = require("../helper-hardhat-config")

// To check what the premium is, check the docs here:
// https://docs.chain.link/docs/vrf/v2/subscription/supported-networks/#goerli-testnet
const BASE_FEE = ethers.utils.parseEther("0.25")
// Calculated value depending on the gas price of the chain
const GAS_PRICE_LINK = 1e9

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (devChains.includes(network.name)) {
        log("Deploying mocks to local network")
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("Deployment complete")
    }
}

module.exports.tags = ["all", "mocks"]
