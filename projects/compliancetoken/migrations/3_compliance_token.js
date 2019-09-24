// var ECDSA = artifacts.require("openzeppelin-solidity/ECDSA.sol");
var ECDSA = artifacts.require("ECDSA");
// var SafeMath = artifacts.require("openzeppelin-solidity/SafeMath.sol");
var SafeMath = artifacts.require("SafeMath");

var AccountRegistry = artifacts.require("AccountRegistry");
var ComplianceToken = artifacts.require("ComplianceToken");

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  console.log("ECDSA address = " + ECDSA.address);
  console.log("SafeMath address = " + SafeMath.address);
  console.log("AccountRegistry address = " + AccountRegistry.address);

  // deploy ComplianceToken 
  deployer.link(ECDSA, ComplianceToken);
  deployer.link(SafeMath, ComplianceToken);
  deployer.link(AccountRegistry, ComplianceToken);
  deployer.deploy(ComplianceToken, AccountRegistry.address);

};
