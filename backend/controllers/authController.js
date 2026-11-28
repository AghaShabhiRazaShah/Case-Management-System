const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register Function (Naya User Banana)
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, cnic } = req.body;

    // Check karein ke user pehle se mojood toh nahi
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Naya user banayein
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'clerk', // Default role clerk hai
      phone,
      cnic
    });

    res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login Function
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // User dhundhein
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Password match karein
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // JWT Token generate karein
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'my_super_secret_key_123',
      { expiresIn: '7d' } // Token 7 din tak valid rahega
    );

    res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Logged-in user ki details lane ka function             MIDDLEWARE KA YAHAH SY START HUWA HY.....
const getMe = async (req, res) => {
  try {
    // Middleware ne pehle hi user dhund kar req.user mein daal diya hai
    res.status(200).json({
      success: true,
      data: req.user
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};    // YAHAN TK MIDDLEWARE KA KAAM HY........
module.exports = { registerUser, loginUser, getMe };