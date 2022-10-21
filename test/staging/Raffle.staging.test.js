const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, ethers, network } = require("hardhat")
const { devChains } = require("../../helper-hardhat-config")

devChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Staging Tests", async function () {
          let raffle, raffleEntranceFee, deployer

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              raffle = await ethers.getContract("Raffle", deployer)
              raffleEntranceFee = await raffle.getEntranceFee()
          })

          describe("fulfillRandomWords", function () {
              isCallTrace(
                  "works with live Chainlink Automation and Chainlink VRF, and we get a winner",
                  async function () {
                      const startingTimestampp = await raffle.getLatestTimeStamp()
                      const accounts = await ethers.getSigners()

                      await new Promise(async (resolve, reject) => {
                          raffle.once("WinnerPicked", async () => {
                              console.log("Winner event found")
                              resolve()
                              try {
                                  const recentWinner = await raffle.getRecentWinner()
                                  const raffleState = await raffle.getRaffleState()
                                  const endingBalance = await accounts[0].getBalance()
                                  const endingTimeStamp = await raffle.getLatestTimeStamp()
                                  await expect(raffle.getPlayer(0)).to.be.reverted
                                  assert.equal(recentWinner.toString(), accounts[0].address)
                                  assert.equal(raffleState, 0)
                                  assert.equal(
                                      endingBalance.toString(),
                                      startingBalance.add(raffleEntranceFee).toString()
                                  )
                              } catch (e) {
                                  console.log(e)
                                  reject(e)
                              }
                          })

                          await raffle.enterRaffle({ value: raffleEntranceFee })
                          const startingBalance = await accounts[0].getBalance()
                      })
                  }
              )
          })
      })
