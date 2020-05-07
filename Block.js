const crypto = require("crypto");

class Block {
  constructor(data, previous = "") {
    if (!data) {
      throw new Error("cannot generate block");
    }

    this.previousHash = previous;
    this.timeStamp = new Date();
    this.data = data;
  }

  generateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.previousHash +
          this.timestamp +
          JSON.stringify(this.data) +
          this.nonce
      )
      .digest("hex");
  }
}

module.exports.Block = Block;
