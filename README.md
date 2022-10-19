# Hardhat Smart Contract Lottery Back End

## About

Contains the back end code for the smart contract lottery project

## How To: Build, Deploy, Run

When developing this project locally, please add the following node modules via yarn

-   `yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers @nomiclabs/hardhat-etherscan @nomiclabs/hardhat-waffle chai ethereum-waffle hardhat hardhat-contract-sizer hardhat-deploy hardhat-gas-reporter prettier prettier-plugin-solidity solhint solidity-coverage`
-   `yarn add --dev @chainlink/contracts`

### Notes

-   Offchain protocols depend on Logging and Events
-   When things happen on a blockchain, the EVM writes to a data structure called a Log. Logs can be read from blockchain nodes, and we can make an ethGetLogs call to get the logs
-   Events allow you to print info to the Log data structure in a way that is more gas efficient than using a storage variable
-   Smart contracts cannot access logs
-   When events are emitted, there are 2 kinds of parameters; indexed and non indexed. You can have up to 3 indexed parameters, and are searchable. They are much easier to query than non indexed parameters
-   Non indexed parameters get abi encoded, and we need to know the abi to be able to decode it.
-   Events should be emitted with the function name reversed
-   14:38:57
