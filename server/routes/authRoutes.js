const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);

    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// // Login route
// router.post('/login', async (req, res) => {
//     try {
//       const { username, password } = req.body;
//       console.log(req.body);
  
//       // Check if user exists
//       const user = await User.findOne({ username });
//       if (!user) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }
  
//       // Check if password is correct
//       const passwordMatch = await bcrypt.compare(password, user.password);
//       if (!passwordMatch) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }
  
//       // Create and assign token
//       const token = jwt.sign({ id: user._id }, 'e3841ddccca9dec532f0667f800cff7e1caee293953771328861318d2703d621');
//       res.cookie('token', token, {
//         httpOnly: true,
//         sameSite: 'strict',
//         secure: true
//       });
//       res.status(200).json({ message: 'Login successful' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });


// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Create and assign token
    const token = jwt.sign({ id: user._id }, 'e3841ddccca9dec532f0667f800cff7e1caee293953771328861318d2703d621');

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
