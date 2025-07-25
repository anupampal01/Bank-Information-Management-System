const express = require("express");
const { createBank, getUserBanks, updateBank, deleteBank, getAllBanks } = require("../controllers/bankController");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", auth, createBank);
router.get("/", auth, getUserBanks);
router.put("/:id", auth, updateBank);
router.delete("/:id", auth, deleteBank);
router.get("/all", auth, admin, getAllBanks);

module.exports = router;
