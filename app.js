const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const hbs = require('hbs')
const session = require('express-session')
const passport = require('passport')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')

const { isAuthenticated } = require('./middleware/auth')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const dashboardRouter = require('./routes/dashboard')
const reservationRouter = require('./routes/reservationRoutes')
const order = require('./routes/order')

const dotenv = require('dotenv')
const app = express()
dotenv.config()

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

hbs.registerPartials(path.join(__dirname, 'views', 'partials'))
hbs.registerPartials(path.join(__dirname, 'views', 'layouts'))
hbs.registerPartials(path.join(__dirname, 'views', 'orderViews'))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  session({
    secret: 'XfBf3bN5GkLc7RdW9ZsQaPvTjYe2hCm4',
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/dashboard', dashboardRouter)
app.use('/reservations', reservationRouter) // Updated route for reservations
app.use('/order', order) // Use order routes

app.use('/protected-route', isAuthenticated, (req, res, next) => {
  res.send('This is a protected route')
})

app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
