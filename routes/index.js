var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

// Define route handlers
router.get('/signin', (req, res) => {
  res.render('signin') // Render signin.hbs view
})

router.get('/signup', (req, res) => {
  res.render('signup') // Render signup.hbs view
})
router.get('/dashboard', (req, res) => {
  // Render the dashboard view here
  res.render('dashboard') // Assuming you have a dashboard view named 'dashboard.hbs'
})

module.exports = router
