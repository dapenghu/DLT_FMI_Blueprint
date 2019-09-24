var TutorialToken = artifacts.require("./TutorialToken.sol");

contract('TutorialToken_test', function(accounts) {

  it("show testing environment", async () => {
    let instance = await TutorialToken.deployed();
    console.log("Token address = " + instance.address);

    console.log("account number = " + accounts.length);
    for (var i = 0; i < accounts.length; i++) {
      var balance = await instance.balanceOf.call(accounts[i]);
      console.log(accounts[i] + " = " + balance);
    }
  });

  it("Test totalSupply", async () => {
    let instance = await TutorialToken.deployed();
    let balance = await instance.totalSupply.call();
  });

  it("Test transfer", async () => {
    let instance = await TutorialToken.deployed();
    var result = await instance.transfer(accounts[1], 1000, { from: accounts[0] });
    console.log("transfer result = " + result);
    for (var i = 0; i < accounts.length; i++) {
      var balance = await instance.balanceOf.call(accounts[i]);
      console.log(accounts[i] + " = " + balance);
    }
  });


});
