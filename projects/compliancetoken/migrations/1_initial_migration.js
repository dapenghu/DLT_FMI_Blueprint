var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer, network, accounts) {
  console.log("Deploy Migrations.");

  if (network == "private") {
    var adminAddr = "0xa9f30c037398a2fd0822efBBE6CAaa89ED8a50DE";
    deployer.deploy(Migrations, {from: adminAddr});
  } else {
    deployer.deploy(Migrations);
  }
};
