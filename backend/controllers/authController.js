const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login user/admin
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ---- Admin Login (from .env) ----
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: "1d" });
      return res.json({ token, role: "admin", message: "Admin logged in successfully" });
    }

    // ---- Normal User Login ----
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin || false }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, role: "user", message: "User logged in successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
