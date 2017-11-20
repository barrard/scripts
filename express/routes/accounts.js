const express = require('express')
const passport = require('passport')

const Account = require('../models/account')

const router = express.Router()

router.post('/register', (req, res) => {
  let account = new Account({
    username: req.body.username,
  })

  Account.register(account, req.body.password, (err, account) => {
    if (err) {
      res.status = 422
      res.json({ error: err.message })
      return
    }

    passport.authenticate('local')(req, res, () => {
      if (err) {
        return next(err)
      }
    })
  })
})

router.post('/login', passport.authenticate('local'))

router.post('/logout', (req, res) => {
  req.logout()
})

module.exports = router
