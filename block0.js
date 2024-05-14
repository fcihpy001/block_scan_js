// const Web3 = require('web3');
const { ethers } = require("ethers");
const fs = require("fs");

// const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/506b1f3e9b674e75b10b2f7b16bc5e44");

const provider = new ethers.providers.JsonRpcProvider("https://cloudflare-eth.com")
var account_count = 0

// 获取当前区块信息,遍历每个区块中的交易数据，获取收发地址并存入文件中
const main = async () => {
    for (let n = 17000003; n < 17000004; n++) {
        // let blockNumber = 17689784     17689367
        const block = await provider.getBlockWithTransactions(n);
        const count = block.transactions.length;

        console.log(`当前区块: ${n},矿工地址: ${block.miner} 产生交易的地址数：${count * 2 + 1}`)
        account_count = count * 2 + 1
        // saveToFile(n, block.miner)
        for (let i = 0; i < count; i++) {
            const tx = block.transactions[i];
            // saveToFile(n, tx.from)
            // saveToFile(n, tx.to)
            if (tx.to == null) {
                console.log(tx)
            }
            if (!tx.to) {
                // 获取合约地址
                const contractAddress = tx.creates;
                console.log('合约地址:', contractAddress);
            }
            // console.log(tx.from + '----', tx.to)
        }
    }
}

// 写文件
function saveToFile(blockNumber, content) {
    let filename = './addr0/' + blockNumber + '_' + account_count + '.txt';
    fs.appendFileSync(filename, content + "\n");
}

main()

