const ethers = require('ethers');

var AccountRegistry = artifacts.require("./AccountRegistry.sol");
var ComplianceToken = artifacts.require("./ComplianceToken.sol");
var Accounts = require("./accounts");
var AccountType = require("./AccountType");

contract('AccountRegistryTest', function(accounts) {
  // it("should assert true", function(done) {
  //   var account_registry_test = AccountRegistryTest.deployed();
  //   assert.isTrue(true);
  //   done();
  // });

  // console.table(Accounts);
  // console.dir(Accounts[0]);
  // var web3 = new Web3();

  var adminAccount = accounts[0];
  var mgAccount = accounts[1];
  var citiAccount = accounts[2];
  var aliceAccount = accounts[3];
  var bobAccount = accounts[4];


  it("Test add bank account and user account", async () => {
    console.log("[Test add bank account and user account]");

    let accountRegistry = await AccountRegistry.deployed();
    // verify admin account
    var result = await accountRegistry.getAdminAccount();
    assert.equal(result, adminAccount, "Admin account is wrong.");

    result = await accountRegistry.getAccountType(result);
    console.log("Accout type of " + adminAccount + " is " + AccountType[result]);

    // add MG account
    result = await accountRegistry.addBankAccount(mgAccount, {from: adminAccount});
    console.dir("addBankAccount() tx: " + result.tx);

    result = await accountRegistry.getAccountType(mgAccount);
    console.log("Accout type of " + mgAccount + " is " + AccountType[result]);

    // add Citi account
    result = await accountRegistry.addBankAccount(citiAccount, {from: adminAccount});
    console.dir("addBankAccount() tx: " + result.tx);

    result = await accountRegistry.getAccountType(citiAccount);
    console.log("Accout type of " + citiAccount + " is " + AccountType[result]);
    
    // add Alice account
    result = await accountRegistry.addClientAccount(aliceAccount, {from: mgAccount});
    console.dir("addClientAccount() tx: " + result.tx);

    result = await accountRegistry.getAccountType(aliceAccount);
    console.log("Accout type of " + aliceAccount + " is " + AccountType[result]);

    result = await accountRegistry.getBankAccount(aliceAccount);
    assert.equal(result, mgAccount, "Alice's Bank should be MG.");

    // add Bob account
    result = await accountRegistry.addClientAccount(bobAccount, {from: citiAccount});
    console.dir("addClientAccount() tx: " + result.tx);

    result = await accountRegistry.getAccountType(bobAccount);
    console.log("Accout type of " + bobAccount + " is " + AccountType[result]);

    result = await accountRegistry.getBankAccount(bobAccount);
    assert.equal(result, citiAccount, "Bob's Bank should be Citi.");

  });

});
