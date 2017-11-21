#!/usr/bin/env node

const app = require('./config/app')
const debug = require('debug')('scripts:express')
const http = require('http')
const port = process.env.EXPRESS_PORT || '3000'

app.set('port', port)
const server = http.createServer(app)
server.listen(port)

// Handle common development errors with friendly messages.
// Throw the error if it's anything else.
server.on('error', (err) => {
  let msg = {
    'EACCESS': `Port ${port} requires elevated privileges. ` +
               'Have you tried a different port?',
    'EADDRINUSE': `Port ${port} is not available. ` +
                  'Is another server running?',
  }[err.code]

  if (msg) {
    console.error(msg)
    process.exit(1)
  }
  throw err
})

// Report when the server starts listening.
server.on('listening', () => {
  debug(`Listening on ${port}`)
})
