const express = require('express')
const logger = require('morgan')
const body = require('body-parser')

const Routes = require('../routes/index.js')

// Get the env here, so as not to do an unnecessary global op later.
const env = process.env.NODE_ENV

// TODO: Surely some info would be helpful, right? Maybe a link to an express intro?
const app = express();

// Configure submodules.
require('./security')(app)
require('./database')(app)

// The Morgan logger ships with presets: https://github.com/expressjs/morgan
// Replace `combined` with a different preset or define a custom format.
app.use(logger('combined'));

// Support JSON-encoded bodies.
// TODO: opts?
app.use(body.json())

// Support URL-encoded bodies.
// TODO: extended?
app.use(body.urlencoded({
  extended: true
}))

// CORS Headers allow React to communicate with the server.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// ERROR HANDLERS
//
if (env === 'development') {
  // Development error handler prints stack trace.
  app.use((err, req, res, next) => {
    res.statuc(err.status || 500)
    res.json({
      message: err.message,
      trace: err.stack(),
    })
  })
} else {
  // No stack traces will be leaked any other way.
  app.use((err, req, res, next) => {
    res.statuc(err.status || 500)
    res.json({})
  })
}

// ROUTES
app.use('/', Routes)

module.exports = app;
