const { ethers, network } = require("hardhat")
const fs = require("fs")

const FRONTEND_ADRESSES_FILE =
    "../nextjs-smart-contract-lottery-frontend/constants/contractAddresses.json"

const FRONTEND_ABI_FILE = "../nextjs-smart-contract-lottery-frontend/constants/abi.json"

module.exports = async function () {
    if (process.env.UPDATE_FRONTEND) {
        console.log("Updating front end")
        updateContractAddresses()
        updateAbi()
    }
}

async function updateContractAddresses() {
    const raffle = await ethers.getContract("Raffle")
    const chainId = network.config.chainId.toString()
    const currentAddresses = JSON.parse(fs.readFileSync(FRONTEND_ADRESSES_FILE, "utf8"))
    if (chainId in currentAddresses) {
        if (!currentAddresses[chainId].includes(raffle.address)) {
            currentAddresses[chainId].push(raffle.address)
        }
    }
    {
        currentAddresses[chainId] = [raffle.address]
    }

    fs.writeFileSync(FRONTEND_ADRESSES_FILE, JSON.stringify(currentAddresses))
}

async function updateAbi() {
    const raffle = await ethers.getContract("Raffle")
    fs.writeFileSync(FRONTEND_ABI_FILE, raffle.interface.format(ethers.utils.FormatTypes.json))
}

module.exports.tags = ["all", "frontend"]
