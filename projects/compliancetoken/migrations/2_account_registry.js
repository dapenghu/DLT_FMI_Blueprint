var TutorialToken = artifacts.require("TutorialToken");
var ECDSA = artifacts.require("openzeppelin-solidity/ECDSA.sol");
var SafeMath = artifacts.require("openzeppelin-solidity/SafeMath.sol");

var AccountRegistry = artifacts.require("AccountRegistry");
var ComplianceToken = artifacts.require("ComplianceToken");

module.exports = function(deployer, network, accounts) {
  // Use deployer to state migration tasks.
  console.log("Deploy AccountRegistry.");

  if (network == "private") {
    var adminAddr = "0xa9f30c037398a2fd0822efBBE6CAaa89ED8a50DE";
    deployer.deploy(ECDSA, {from: adminAddr});
    deployer.deploy(SafeMath, {from: adminAddr});
  
    // deploy AccountRegistry 
    deployer.deploy(AccountRegistry, {from: adminAddr});

  } else {
    deployer.deploy(ECDSA);
    deployer.deploy(SafeMath);
  
    // deploy AccountRegistry 
    deployer.deploy(AccountRegistry);
  }

};
