const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/User')

// Local strategy for email/password authentication
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

// GitHub strategy for GitHub authentication
passport.use(
  new GitHubStrategy(
    {
      clientID: 'bb7c1d828bcb9f8594e4',
      clientSecret: 'c650e87f68e2d654a5b9c93f0154d4f410d5082f',
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id })
        if (!user) {
          user = new User({
            githubId: profile.id,
            username: profile.username,
            email: profile.emails[0].value, // Assuming email is available
          })
          await user.save()
        }
        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
)

// Serialize and deserialize user
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
