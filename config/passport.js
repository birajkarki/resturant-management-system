const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/User')

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          return done(null, false, { message: 'Incorrect email' })
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
          return done(null, false, { message: 'Incorrect password' })
        }
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})

module.exports = passport
