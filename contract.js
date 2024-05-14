// const Web3 = require('web3');
const { ethers } = require("ethers");
const fs = require("fs");
const { FMT_BYTES } = require("web3");

// const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/506b1f3e9b674e75b10b2f7b16bc5e44");

const provider = new ethers.providers.JsonRpcProvider("https://cloudflare-eth.com")
var account_count = 0

// 获取当前区块信息,遍历每个区块中的交易数据，获取收发地址并存入文件中
const main = async () => {
    for (let n = 17841137; n > 17000000; n--) {
        const block = await provider.getBlockWithTransactions(n);
        const count = block.transactions.length;

        console.log(`当前区块号: ${n}`);

        account_count = count * 2 + 1
        // saveToFile(n, block.miner)
        for (let i = 0; i < count; i++) {
            const tx = block.transactions[i];
            console.log(`区块号:${n},交易批次${i}`)
            console.log(tx.from)
            console.log(tx)
            if (!tx.to) {
                saveToFile(tx.creates)
            }
        }
    }
}

// 写文件
function saveToFile(content) {
    let filename = './contract_addr.txt';
    fs.appendFileSync(filename, content + "\n");
}

main()

