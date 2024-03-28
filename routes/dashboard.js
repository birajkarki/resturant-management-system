// routes/dashboard.js

const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/auth')

// Dashboard route
router.get('/', isAuthenticated, (req, res) => {
  // Render the dashboard view
  res.render('dashboard')
})

module.exports = router
