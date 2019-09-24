pragma solidity ^0.5.0;
/** 
 * @dev Registry for address
 * TODO: change contract to library
 */

contract AccountRegistry {

  address _admin;
  enum AccountType { None, Admin, Bank, Client }

  mapping (address => AccountType) _accountTypeOf;
  mapping (address => address) _bankOf;  // the bank address of each client account

  constructor() public {
    _admin = msg.sender;
    _accountTypeOf[_admin] =   AccountType.Admin;  
  }

  function getAccountType(address addr) public view returns (AccountType) {
    return _accountTypeOf[addr];
  }

  function isAccountTrusted(address addr) public view returns(bool) {
    return getAccountType(addr) == AccountRegistry.AccountType.Admin 
      || getAccountType(addr) == AccountRegistry.AccountType.Bank ;
  }

  function getBankAccount(address addr) public view returns (address) {
    return _bankOf[addr];
  }

  function getAdminAccount() public view returns (address) {
    return _admin;
  }

  function addClientAccount(address addr) public {
    require(_accountTypeOf[msg.sender] == AccountType.Bank);
    require(_accountTypeOf[addr] == AccountType.None );
    require(_bankOf[addr] == address(0));

    _bankOf[addr] = msg.sender;
    _accountTypeOf[addr] = AccountType.Client;
  }

  function addBankAccount(address addr) public {
    require(msg.sender == _admin);

    _bankOf[addr] = msg.sender;
    _accountTypeOf[addr] = AccountType.Bank;
  }

}
