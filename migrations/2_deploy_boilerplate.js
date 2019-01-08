var ContractBoilerplate = artifacts.require("./ContractBoilerplate.sol");

module.exports = function(deployer) {
  deployer.deploy(ContractBoilerplate);
};
