var TutorialToken = artifacts.require("TutorialToken");
var ECDSA = artifacts.require("openzeppelin-solidity/ECDSA.sol");
var SafeMath = artifacts.require("openzeppelin-solidity/SafeMath.sol");

var AccountRegistry = artifacts.require("AccountRegistry");
var ComplianceToken = artifacts.require("ComplianceToken");

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(ECDSA);
  deployer.deploy(SafeMath);

  // deploy AccountRegistry 
  deployer.deploy(AccountRegistry);

};
