const cookies  = require('cookie-parser')
const sessions = require('express-session')
const passport = require('passport')
const strategy = require('passport-local')
const Account  = require('../models/account')

function init(app) {
  // Support the setting and reading of cookies.
  // TODO: opts?
  app.use(cookies())

  // TODO: what's this?
  app.use(sessions({
    secret: 'wizardly keyboard cat',
    resave: false,
    saveUninitialized: false,
  }))

  // Initialize passport and use passport's builtin sessions.
  app.use(passport.initialize())
  app.use(passport.session())

  // Use the Account model's authentication method as the application standard.
  passport.use(new strategy(Account.authenticate()))

  // Serialize and deserialize the Account automatically with passport.
  passport.serializeUser(Account.serializeUser())
  passport.deserializeUser(Account.deserializeUser())

  // Forward the passport instance.
  return passport
}

module.exports = init
