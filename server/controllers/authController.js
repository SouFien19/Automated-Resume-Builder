const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Inscription
exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const user = await User.create({ fullName, email, password });
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Connexion
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};