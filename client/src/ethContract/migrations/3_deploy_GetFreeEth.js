const GetFreeEth = artifacts.require('GetFreeEth')

module.exports = deployer => {
    deployer.deploy(GetFreeEth)
}