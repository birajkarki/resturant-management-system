// routes/index.js
var express = require('express')
var router = express.Router()
const { isAuthenticated } = require('../middleware/auth') // Import the isAuthenticated middleware

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

// Route handler for the sign-in page
router.get('/signin', isAuthenticated, (req, res) => {
  // Render the dashboard page if user is authenticated
  // Otherwise, render the sign-in page
  if (req.isAuthenticated()) {
    res.redirect('/dashboard')
  } else {
    res.render('signin')
  }
})

// Route handler for the sign-up page
router.get('/signup', isAuthenticated, (req, res) => {
  // Render the dashboard page if user is authenticated
  // Otherwise, render the sign-up page
  if (req.isAuthenticated()) {
    res.redirect('/dashboard')
  } else {
    res.render('signup')
  }
})

// Route handler for the dashboard page
router.get('/dashboard', (req, res) => {
  // Render the dashboard view here
  res.render('dashboard') // Assuming you have a dashboard view named 'dashboard.hbs'
})

module.exports = router
