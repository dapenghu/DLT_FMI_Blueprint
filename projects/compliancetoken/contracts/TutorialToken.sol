pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/cryptography/ECDSA.sol";

contract TutorialToken is ERC20 {
  using ECDSA for bytes32;

  string public name = "TutorialToken";
  string public symbol = "TT";
  uint8 public decimals = 2;
  uint public INITIAL_SUPPLY = 12000;

  constructor() public {
    _mint(msg.sender, INITIAL_SUPPLY);
  }

  function verifySignature(uint256 par1, uint256 par2, bytes memory sig) public view{
    bytes32 hash = keccak256(abi.encodePacked(par1, par2));
    bytes32 msghash = hash.toEthSignedMessageHash();

    address client = msghash.recover(sig);
    require (client == msg.sender);
  }

}
