const { Transaction } = require("./Transaction");
const { Blockchain } = require("./Blockchain");
const { Block } = require("./Block");
const myTransaction = new Transaction("a", "b", 20);
const myBlock = new Block(myTransaction.toObject());
const myTransaction2 = new Transaction("b", "a", 30);

const myBlock2 = new Block(myTransaction2.toObject());
const myBlockChain = new Blockchain();
try {
  // add genesis block;
  myBlockChain.addNewBlock(myBlock);
  myBlockChain.addNewBlock(myBlock);
  myBlockChain.addNewBlock(myBlock);

  // add transaction
  myBlockChain.addTransaction(myTransaction2);

  // add transaction
  myBlockChain.addTransaction(new Transaction("b", "a", 5));

  myBlockChain.minBlock();
  myBlockChain.minBlock();

  console.log("Before Mining\n");
  console.log(myBlockChain.chain);
  console.log("\n\n");
} catch (e) {
  console.log(e);
}
