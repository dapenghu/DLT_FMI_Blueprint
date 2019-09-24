pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/cryptography/ECDSA.sol";
import "./AccountRegistry.sol";

contract ComplianceToken{
  using SafeMath for uint256;
  using ECDSA for bytes32;

  mapping(address => uint256) private _balance;
  address private _issuer;
  uint256 private _totalSupply;
  AccountRegistry private _accountRegistry;

  event Keccak256(bytes message, bytes32 hash);
  event EthMsgHash(bytes32 hash, bytes32 msgHash);
  event DumpAccountRegistry(address addr);
  event DumpTrustedAccount(address addr, bool);
  event DumpCommonAccount(address addr, bool, address bankAddr);

  constructor(address regAddr) public {
    require(regAddr != address(0));

    _issuer = msg.sender;
    _totalSupply = 1000000;
    _balance[_issuer] = _totalSupply;
    _accountRegistry = AccountRegistry(regAddr);

  }

  function getAccountRegistry() public view returns(address) {
    return address(_accountRegistry);
  }

  // Admin 或者 Bank 可以直接转账
  function trustedTransfer(address recipient, uint256 amount) public {
      require(recipient != address(0), "ERC20: transfer to the zero address");

      require( _accountRegistry.isAccountTrusted(msg.sender) );

      doTransfer(msg.sender, recipient, amount);
    }

  // 转账
  function transfer(address payer, address recipient, uint256 amount, bytes memory signature) 
  public {
    // 检查转账规则
    // payer 与 recipient 的地址是已经注册过的

    require(_accountRegistry.getAccountType(payer) != AccountRegistry.AccountType.None);
    require(_accountRegistry.getBankAccount(payer) == msg.sender);
    require(_accountRegistry.getAccountType(recipient) != AccountRegistry.AccountType.None);
    
    address recoverAddr = recoverSign(recipient, amount, signature);

    // 检查交易 payer 的签名
    require(payer == recoverAddr);

    doTransfer(payer, recipient, amount);
  }

  function doTransfer(address payer, address recipient, uint256 amount) internal {
    // 检查 payer 的余额
    require(_balance[payer] >= amount);

    // TODO: 优化转账的语法，优化数学运算的语法
    _balance[payer] = _balance[payer].sub(amount);
    _balance[recipient] = _balance[recipient].add(amount);
  }

  // 查询余额
  function balanceOf(address addr) public view returns (uint256) {
    return _balance[addr];
  }

  function recoverSign(address recipient, uint256 amount, bytes memory signature) 
  public pure returns(address){
    
    bytes32 msghash = keccak256(
      abi.encodePacked("\x19Ethereum Signed Message:\n64", uint256(recipient), amount));

    address result = msghash.recover(signature);
    return result;
  }

  function testHash(address recipient, uint256 amount) public {
    
    bytes32 hash = keccak256(abi.encodePacked(uint256(recipient), amount));
    emit Keccak256(abi.encodePacked(uint256(recipient), amount), hash);

    bytes32 msghash = hash.toEthSignedMessageHash();
    emit EthMsgHash(hash, msghash);
  }

  function dump(address mgAddr, address citiAddr, address aliceAddr, address bobAddr) public {
    // AccountRegistry address 
    emit DumpAccountRegistry(address(_accountRegistry));

    // MG and Citi infor
    emit DumpTrustedAccount(mgAddr, _accountRegistry.isAccountTrusted(mgAddr));
    emit DumpTrustedAccount(citiAddr, _accountRegistry.isAccountTrusted(citiAddr));

    // Alice and Bob infor
    emit DumpCommonAccount(aliceAddr, _accountRegistry.isAccountTrusted(aliceAddr), _accountRegistry.getBankAccount(aliceAddr));

    emit DumpCommonAccount(bobAddr, _accountRegistry.isAccountTrusted(bobAddr), _accountRegistry.getBankAccount(bobAddr));

  }
}
