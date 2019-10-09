// var ECDSA = artifacts.require("openzeppelin-solidity/ECDSA.sol");
var ECDSA = artifacts.require("ECDSA");
// var SafeMath = artifacts.require("openzeppelin-solidity/SafeMath.sol");
var SafeMath = artifacts.require("SafeMath");

var AccountRegistry = artifacts.require("AccountRegistry");
var ComplianceToken = artifacts.require("ComplianceToken");

module.exports = function(deployer, network, accounts) {
  // Use deployer to state migration tasks.
  console.log("Deploy ComplianceToken.");

  if (network == "private") {
    var adminAddr = "0xa9f30c037398a2fd0822efBBE6CAaa89ED8a50DE";

    // deploy ComplianceToken 
    deployer.link(ECDSA, ComplianceToken);
    deployer.link(SafeMath, ComplianceToken);
    deployer.link(AccountRegistry, ComplianceToken);
    deployer.deploy(ComplianceToken, AccountRegistry.address, {from: adminAddr});

  } else {
    // deploy ComplianceToken 
    deployer.link(ECDSA, ComplianceToken);
    deployer.link(SafeMath, ComplianceToken);
    deployer.link(AccountRegistry, ComplianceToken);
    deployer.deploy(ComplianceToken, AccountRegistry.address);
  }

};
