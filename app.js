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
const order = require('./routes/order') // Add order routes

const dotenv = require('dotenv')
const app = express()
dotenv.config()

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// Register Handlebars partials and layouts
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))
hbs.registerPartials(path.join(__dirname, 'views', 'layouts'))
hbs.registerPartials(path.join(__dirname, 'views', 'orderViews')) // Register order views directory

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Initialize session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
)

// Initialize Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/dashboard', dashboardRouter)
app.use('/reservations', reservationRouter) // Updated route for reservations
app.use('/order', order) // Use order routes

// Middleware to protect routes that require authentication
app.use('/protected-route', isAuthenticated, (req, res, next) => {
  // This route is protected and only accessible to authenticated users
  res.send('This is a protected route')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
