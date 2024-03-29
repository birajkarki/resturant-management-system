const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') // Import JWT library
const User = require('../models/User')

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    })
    await user.save()
    res.redirect('/dashboard')
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      // Duplicate email error
      return res.render('signup', {
        errorMessage:
          'Email already exists. Please choose a different email address.',
      })
    }
    console.error('Error registering user:', error.message)
    res.status(500).send('Error registering user')
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).send('User not found')
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.status(401).send('Invalid password')
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    // Sign token with expiration
    // Store token in local storage
    res.locals.token = token
    // Redirect user to dashboard upon successful login
    res.redirect('/dashboard')
  } catch (error) {
    res.status(500).send('Error logging in')
  }
})
router.post('/logout', (req, res) => {
  // Clear the token or session data
  // Redirect user to login page or any other appropriate page
  res.redirect('/signin') // Redirect to login page
})

module.exports = router
