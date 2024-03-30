// middleware/auth.js
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/dashboard')
}

module.exports = { isAuthenticated }
