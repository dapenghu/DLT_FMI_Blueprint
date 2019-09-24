# Phase I
## 数据结构
- Account Table Contract
    - Super 账户
    - Bank 账户
    - User 账户

- Token Contract
  - getBalance
  - transfer
  - total

## 部署
- Account Table Contract
  - Super 账户

- Token Contract
    - Account Table Contract Address

## 流程
1. 添加 Bank 账户: mg,citi
2. 添加 User 账户: alice, bob
3. mg 向 Alice 铸币
4. Alice 向 bob 转账

## 客户端
- 创建账户: super, mg, citi, alice, bob
- 创建请求，签名

# Phase II
## 客户端
- 调用 API，发布请求

## 合规服务
- 接受交易请求，审核用户身份
- 通过后，再签名，发送交易

# Phase III
增加UI，在图形界面中完成上述操作

# Phase IV 
Debug with EthereumJ
