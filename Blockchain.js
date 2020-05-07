const { Block } = require("./Block");
const { Transaction } = require("./Transaction");
class Blockchain {
  constructor() {
    this.chain = [this.createFirstBlock()];
    this.pendingTransactions = [];
    this.nonce = 0;
    this.fee = 2;
    this.difficulty = 2;
  }

  createFirstBlock() {
    return new Block({}).generateHash();
  }

  lastestBlock() {
    return this.chain[this.chain.length - 1];
  }
  minBlock() {
    // console.log("mining");
    const isNoPendingTransaction = this.pendingTransactions.length === 0;
    if (isNoPendingTransaction) {
      return;
    }

    setTimeout(() => {
      const minedTransaction = this.pendingTransactions[0].toObject();
      this.pendingTransactions.shift();
      const fromAddress = minedTransaction.from;
      const minerTransaction = new Transaction(fromAddress, "miner", this.fee);
      const minerBlock = new Block(minerTransaction.toObject());
      this.addNewBlock(minerBlock);
      this.addNewBlock(new Block(minedTransaction));
      console.log("new Chain\n");
      console.log(this.chain);
      return;
    }, this.difficulty * 1000);
  }

  addTransaction(transaction) {
    if (this.getBalance(transaction.from) <= transaction.amount) {
      throw new Error("balance is not enough");
    }
    this.pendingTransactions.push(transaction);
  }
  addNewBlock(block) {
    block.previousHash = this.lastestBlock().hash;
    block.data.amount = block.data.amount - this.fee;
    block.hash = block.generateHash();
    this.chain.push({ ...block, nonce: this.nonce });
    this.nonce++;
    console.log(`${block.hash} is added \n`);
  }

  getBalance(address) {
    let balance = 0;
    this.chain.forEach(({ data }) => {
      if (data) {
        if (data.from === address) {
          balance -= data.amount;
        } else if (data.to === address) {
          balance += data.amount;
        }
      }
    });
    return balance;
  }
}

module.exports.Blockchain = Blockchain;
