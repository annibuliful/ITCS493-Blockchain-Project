const crypto = require("crypto");

class Transaction {
  constructor(from, to, amount) {
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.timestamp = Date.now();
  }
  generateHash() {
    return crypto
      .createHash("sha256")
      .update(this.fromAddress + this.toAddress + this.amount + this.timestamp)
      .digest("hex");
  }

  toObject() {
    return {
      from: this.from,
      to: this.to,
      amount: this.amount,
      timestamp: this.timestamp,
    };
  }
}

module.exports.Transaction = Transaction;
