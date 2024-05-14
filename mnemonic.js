const bip39 = require('bip39');
const fs = require("fs");
const ethers = require("ethers");

const words = bip39.wordlists.english

// 从助记词列表中随机抽取12个，形成一组，然后验证合法性，并将合法的助记写入文件，每10000个存入一个文件，文件名用时间戳表示
let t = 0
var v = ""
var count = 0
var timestamp = Date.parse(new Date());
let name = timestamp * 0.001.toLocaleString().replace(/:\d  {1,2}$/, ' ');
let dir = '/Users/fcihpy/Desktop/addr/'

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
        makeAddr(v)
    }
}

function makeAddr(mnemonic) {
    // 创建HD钱包
    const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic)

    let hdNodeNew = hdNode.derivePath("m/44'/60'/0'/0/0");
    let walletNew = new ethers.Wallet(hdNodeNew.privateKey);
    let addr = hdNodeNew.privateKey + "#" + mnemonic + '@' + walletNew.address + "\n"
    count += 1
    if (count == 10000) {
        var timestamp = Date.parse(new Date());
        name = timestamp * 0.001.toLocaleString().replace(/:\d  {1,2}$/, ' ');
        count = 0
    }
    console.log(addr)
    // 将钱包地址写入文件
    fs.appendFileSync(dir + name + ".txt", addr);
}




