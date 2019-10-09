var keythereum = require("keythereum");
var web3 = require("Web3");
var dataDir = "/Users/damonhu/Library/Ethereum";
var password = "123456";

var minerAddr = "0xC5db88189989796bDd5A010E534F3B50B7DF46a5";
var adminAddr = "0xa9f30c037398a2fd0822efBBE6CAaa89ED8a50DE";
var mgAddr    = "0x4cF966068F765EFfb7b9ee22D223651bF81dd3D4";
var citiAddr  = "0x2Eb745aB5478645066996BF6214D17717Eb3E195";
var aliceAddr = "0x95897AD092Bd59d3DE04D270b2F654c6Bb0f752f";
var bobAddr   = "0x9d4c272363b6156E3b7aA18A824dd9CE3325AB5E";
var criseAddr = "0xE62773ef3F762ee2B46753BEE9865de5FD8f62c1";

/** 
 * Miner private key = 0xeeed788818cd9f180e23a902854ab43eed6260a44411c360e396fd297799c7bb
 * Admin private key = 0x7c45d9b574d2a42006d89f152e0100f372391921a0613ad60fde180a9fe9d069
 * MG private key    = 0xe2f82940bae7cb726e1014fbcd254e79e359f1b44cdabcf9c0c1eff7429b7645
 * Citi private key  = 0xc28439c1b0f17e952c72270bd5eea44d13ae90bca4446fc2f0b7b9663070331d
 * Alice private key = 0x7738c3de3136b6d7dae780e6095c4d4fa3de27d1f6077f1f7b4955cfc4be407a
 * Bob private key   = 0x3886791a2b03c23aa4b5cc982a4a39216956c0f9012b5437e2cbf1b02a3043a2
 */

 var keyObj = keythereum.importFromFile(minerAddr, dataDir)
var priKey = keythereum.recover(password, keyObj);
console.log("Miner private key = " + web3.utils.bytesToHex(priKey));


keyObj = keythereum.importFromFile(adminAddr, dataDir)
priKey = keythereum.recover(password, keyObj);
console.log("Admin private key = " + web3.utils.bytesToHex(priKey));

keyObj = keythereum.importFromFile(mgAddr, dataDir)
priKey = keythereum.recover(password, keyObj);
console.log("MG private key = " + web3.utils.bytesToHex(priKey));

keyObj = keythereum.importFromFile(citiAddr, dataDir)
priKey = keythereum.recover(password, keyObj);
console.log("Citi private key = " + web3.utils.bytesToHex(priKey));

keyObj = keythereum.importFromFile(aliceAddr, dataDir)
priKey = keythereum.recover(password, keyObj);
console.log("Alice private key = " + web3.utils.bytesToHex(priKey));

keyObj = keythereum.importFromFile(bobAddr, dataDir)
priKey = keythereum.recover(password, keyObj);
console.log("Bob private key = " + web3.utils.bytesToHex(priKey));

