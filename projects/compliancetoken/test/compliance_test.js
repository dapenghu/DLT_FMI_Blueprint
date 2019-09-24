const ethers = require('ethers');
var AccountRegistry = artifacts.require("./AccountRegistry.sol");
let ComplianceToken = artifacts.require("./ComplianceToken.sol");
var AccountType = require("./AccountType");

contract('ComplianceTest', function(accounts) {
  var adminAccount = accounts[0];
  var mgAccount = accounts[1];
  var citiAccount = accounts[2];
  var aliceAccount = accounts[3];
  var bobAccount = accounts[4];

  it("Test: trustedTransfer()", async()=>{
    let complianceToken = await ComplianceToken.deployed();
    let accountRegistry = await AccountRegistry.deployed();
    var addr = await complianceToken.getAccountRegistry();
    assert.equal(addr, accountRegistry.address, "ComplianceToken's AccountRegistry address is wrong.")
  });

  it("Test add bank account and user account", async () => {
    console.log("[Test add bank account and user account]");

    let accountRegistry = await AccountRegistry.deployed();

    // verify admin account
    var result = await accountRegistry.getAdminAccount();
    assert.equal(result, adminAccount, "Admin account is wrong.");
    result = await accountRegistry.getAccountType(result);
    assert.equal(AccountType[result], "Admin", 
    "Accout type of " + adminAccount + " shoulde be Admin " );

    // add MG account
    result = await accountRegistry.addBankAccount(mgAccount, {from: adminAccount});
    result = await accountRegistry.getAccountType(mgAccount);
    assert.equal(AccountType[result], "Bank", 
    "Accout type of " + mgAccount + " shoulde be Bank " );

    // add Citi account
    result = await accountRegistry.addBankAccount(citiAccount, {from: adminAccount});
    result = await accountRegistry.getAccountType(citiAccount);
    assert.equal(AccountType[result], "Bank", 
    "Accout type of " + citiAccount + " shoulde be Bank " );
    
    // add Alice account
    result = await accountRegistry.addClientAccount(aliceAccount, {from: mgAccount});
    result = await accountRegistry.getAccountType(aliceAccount);
    assert.equal(AccountType[result], "Client", 
    "Accout type of " + citiAccount + " shoulde be Client " );
    result = await accountRegistry.getBankAccount(aliceAccount);
    assert.equal(result, mgAccount, "Alice's Bank should be MG.");

    // add Bob account
    result = await accountRegistry.addClientAccount(bobAccount, {from: citiAccount});
    result = await accountRegistry.getAccountType(bobAccount);
    assert.equal(AccountType[result], "Client", 
    "Accout type of " + bobAccount + " shoulde be Client " );
    result = await accountRegistry.getBankAccount(bobAccount);
    assert.equal(result, citiAccount, "Bob's Bank should be Citi.");

  });

  it("Test: trustedTransfer()", async()=>{
    console.log("[Test trustedTransfer()]");
    let complianceToken = await ComplianceToken.deployed();

    // check admin's account
    var result = await complianceToken.balanceOf(adminAccount);
    console.log("Balance of Admin account is " + result);

    // Admin 转账给MG
    result = await complianceToken.trustedTransfer(mgAccount, 1000, {from: adminAccount});
    result = await complianceToken.balanceOf(mgAccount);
    console.log("MG balance = " + result);

    // MG 转账给 Alice
    result = await complianceToken.trustedTransfer(aliceAccount, 2000, {from: adminAccount});
    result = await complianceToken.balanceOf(aliceAccount);
    console.log("Alice balance = " + result);
    console.log("Admin balance = " + await complianceToken.balanceOf(adminAccount));

  });

  it("Test: testHash()", async()=>{
    // console.log("[Test: testHash()]");
    // let complianceToken = await ComplianceToken.deployed();

    // // Test Hash
    // var result = await complianceToken.testHash(bobAccount, 500);
    // console.dir(result.logs);
  });

  it("Test: recoverSign()", async()=>{
    // console.log("[Test: recoverSign()]");
    // let complianceToken = await ComplianceToken.deployed();

    // // MG sign the bobAccount and amount(500)
    // var data = web3.eth.abi.encodeParameters(["address", "uint256"],[bobAccount, 500]);
    // var mgSignature = await web3.eth.sign(data, mgAccount);
    // // console.log("signature length = " + mgSignature.length/2);

    // // recover MG's address by the signature through web3 library
    // var recoveredAddr = await web3.eth.accounts.recover(data, mgSignature);
    // console.log("MG address is : " + mgAccount + "; recovered address is : " + recoveredAddr);

    // // recover MG's address by the signature through contract
    // var signBytes = web3.utils.hexToBytes(mgSignature);
    // // Note: reference to the ECDSA library, add v by 27
    // signBytes[64] += 27;
    // console.log("malleable signature = " + web3.utils.bytesToHex(signBytes));

    // var result = await complianceToken.recoverSign(bobAccount, 500, signBytes);
    // console.dir(result.logs);

    // console.log("MG sign the data " + data + "\n as : " + mgSignature);
    // result = await complianceToken.transfer(aliceAccount, bobAccount, 500, mgSignature);
    // console.log(result);
  });

  it("Test: transfer()", async()=>{
    console.log("[Test transfer()]");
    let complianceToken = await ComplianceToken.deployed();
    var balances = {
      "alice": 0,
      "bob": 0
    };

    // Alice Bob 余额
    balances["alice"] = await complianceToken.balanceOf(aliceAccount);
    balances["bob"] = await complianceToken.balanceOf(bobAccount);
    console.table(balances);

    // Alice 转账给 Bob
    
    // Alice sign the bobAccount and amount(500)
    var data = web3.eth.abi.encodeParameters(["address", "uint256"],[bobAccount, 500]);
    var aliceSignature = await web3.eth.sign(data, aliceAccount);
    // recover MG's address by the signature through contract
    var signBytes = web3.utils.hexToBytes(aliceSignature);
    // Note: reference to the ECDSA library, add v by 27
    signBytes[64] += 27;

    var result = await complianceToken.transfer(aliceAccount, bobAccount, 500, signBytes, 
      {from: mgAccount});

    // Alice Bob 余额
    balances["alice"] = await complianceToken.balanceOf(aliceAccount);
    balances["bob"] = await complianceToken.balanceOf(bobAccount);
    console.table(balances);

  });

  async function dumpComplianceToken() {
    console.log("[Dump Compliane Token Contract]");
    let complianceToken = await ComplianceToken.deployed();
    console.dir("ComplianceToken address = " + complianceToken.address);

    let accountRegistry = await AccountRegistry.deployed();
    console.dir("AccountRegistry address = " + accountRegistry.address);

    console.dir("Admin address = " + adminAccount);
    console.dir("MG address = " + mgAccount);
    console.dir("Citi address = " + citiAccount);
    console.dir("Alice address = " + aliceAccount);
    console.dir("Bob address = " + bobAccount);
    var result = await complianceToken.dump(mgAccount, citiAccount, aliceAccount, bobAccount);

    console.dir(result.logs);
  }
});
