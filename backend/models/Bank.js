const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ifscCode: { type: String, required: true },
  branchName: { type: String, required: true },
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  accountHolderName: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Bank", bankSchema);
