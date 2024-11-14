const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { login } = require("../controllers/authController.js")

// Signup Route
router.post('/signup', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if(!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "All fields are required"});
  }

  try {
    const existingUser = await User.findOne({ email });
    if(existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({ email, password, firstName, lastName });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({ message: "Profile Created", token });
  } catch(error) {
    res.status(500).json({ message: "Error signing up" });
  }
  
  
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.json(200).json({
    message: "Login successful",
    token : token
});
});

module.exports = router;
