const bip39 = require('bip39');
const fs = require("fs");
const ethers = require("ethers");

const words = bip39.wordlists.english
let basePath = "m/44'/60'/0'/0";

// 从助记词列表中随机抽取12个，形成一组，然后验证合法性，然后直接生成
let t = 0
var v = ""
var count = 0
var timestamp = Date.parse(new Date());
let name = timestamp * 0.001.toLocaleString().replace(/:\d  {1,2}$/, ' ');
let dir = '/Users/fcihpy/Desktop/block_wallet/test/'

while (t < 1) {
    v = ""
    for (var i = 0; i < 12; i++) {
        const rand = Math.round(Math.random() * 2048);
        let c = words[rand]
        v = v + c
        if (i < 11) {
            v = v + " "
        }
    }
    const validate = bip39.validateMnemonic(v)
    if (validate) {
        count += 1
        if (count == 3000) {
            var timestamp = Date.parse(new Date());
            name = timestamp * 0.001.toLocaleString().replace(/:\d  {1,2}$/, ' ');
            count = 0
        }
        // fs.appendFileSync(dir + name + ".txt", v + "\n");
        let path = dir + name + ".txt"
        makeAddr(v, path)
    }
}

function makeAddr(mnemonic, path) {
    for (let i = 0; i < 3; i++) {
        if (!bip39.validateMnemonic(mnemonic)) {
            continue
        }
        // 创建HD钱包
        const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic)

        let hdNodeNew = hdNode.derivePath(basePath + "/" + i);
        let walletNew = new ethers.Wallet(hdNodeNew.privateKey);
        let addr = mnemonic + '@' + walletNew.address + "\n"

        console.log(addr)
        // 将钱包地址写入文件
        fs.appendFileSync(path, addr);
    }
}

// 写入数据库

