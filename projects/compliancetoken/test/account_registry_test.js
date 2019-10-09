const ethers = require('ethers');

var AccountRegistry = artifacts.require("./AccountRegistry.sol");
var ComplianceToken = artifacts.require("./ComplianceToken.sol");
var Accounts = require("./accounts");
var AccountType = require("./AccountType");

contract('AccountRegistryTest', function(accounts) {

  // var adminAccount = accounts[0];
  // var mgAccount = accounts[1];
  // var citiAccount = accounts[2];
  // var aliceAccount = accounts[3];
  // var bobAccount = accounts[4];

  var adminAddr = "0xa9f30c037398a2fd0822efBBE6CAaa89ED8a50DE";
  var mgAddr    = "0x4cF966068F765EFfb7b9ee22D223651bF81dd3D4";
  var citiAddr  = "0x2Eb745aB5478645066996BF6214D17717Eb3E195";
  var aliceAddr = "0x95897AD092Bd59d3DE04D270b2F654c6Bb0f752f";
  var bobAddr   = "0x9d4c272363b6156E3b7aA18A824dd9CE3325AB5E";
  

  it("Test add bank account and user account", async () => {
    console.log("[Test add bank account and user account]");

    let accountRegistry = await AccountRegistry.deployed();
    // verify admin account
    var result = await accountRegistry.getAdminAccount();
    assert.equal(result, adminAddr, "Admin account is wrong.");

    result = await accountRegistry.getAccountType(result);
    console.log("Accout type of " + adminAddr + " is " + AccountType[result]);

    // add MG account
    result = await accountRegistry.addBankAccount(mgAddr, {from: adminAddr});
    result = await accountRegistry.getAccountType(mgAddr);
    console.log("Accout type of " + mgAddr + " is " + AccountType[result]);

    // add Citi account
    result = await accountRegistry.addBankAccount(citiAddr, {from: adminAddr});
    result = await accountRegistry.getAccountType(citiAddr);
    console.log("Accout type of " + citiAddr + " is " + AccountType[result]);
    
    // add Alice account
    result = await accountRegistry.addClientAccount(aliceAddr, {from: mgAddr});
    result = await accountRegistry.getAccountType(aliceAddr);
    console.log("Accout type of " + aliceAddr + " is " + AccountType[result]);

    result = await accountRegistry.getBankAccount(aliceAddr);
    assert.equal(result, mgAddr, "Alice's Bank should be MG.");

    // add Bob account
    result = await accountRegistry.addClientAccount(bobAddr, {from: citiAddr});
    result = await accountRegistry.getAccountType(bobAddr);
    console.log("Accout type of " + bobAddr + " is " + AccountType[result]);

    result = await accountRegistry.getBankAccount(bobAddr);
    assert.equal(result, citiAddr, "Bob's Bank should be Citi.");

  });

});
