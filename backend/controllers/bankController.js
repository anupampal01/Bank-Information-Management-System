const Bank = require("../models/Bank");

exports.createBank = async (req, res) => {
  try {
    const bank = await Bank.create({ ...req.body, user: req.user.id });
    res.status(201).json(bank);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserBanks = async (req, res) => {
  try {
    const banks = await Bank.find({ user: req.user.id });
    res.json(banks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBank = async (req, res) => {
  try {
    const bank = await Bank.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(bank);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBank = async (req, res) => {
  try {
    await Bank.findByIdAndDelete(req.params.id);
    res.json({ message: "Bank info deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllBanks = async (req, res) => {
  try {
    const banks = await Bank.find().populate("user", "username email");
    res.json(banks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
