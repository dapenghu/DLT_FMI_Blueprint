var Contract = require("@truffle/contract");
var ECDSAJson = require("openzeppelin-solidity/build/contracts/ECDSA.json");
var ECDSA = Contract(ECDSAJson);

contract('Web3.eth.accounts test suite', function(accounts) {

  it("Genrate Account", async () => {
    var account = web3.eth.accounts.privateKeyToAccount('0xbf8cec788bdcb3677da98a99b235095c5827e890d5ae68aed66f63202510c31b');

    console.log(account);
    console.log("/n");
  });

  it("Accout sign transaction", async () => {
    var account = web3.eth.accounts.privateKeyToAccount('0xbf8cec788bdcb3677da98a99b235095c5827e890d5ae68aed66f63202510c31b');

    console.log(account);
    console.log("/n");
  });


});
