const passport = require('passport')
const Account = require('../models/account')

const router = require('express').Router()

router.post('/register', (req, res) => {
  let account = new Account({ username: req.body.username })

  Account.register(account, req.body.password, (err, _) => {
    if (err) {
      res.status = 422
      res.json({ error: err.message })
    }
  })
})

router.post('/login', passport.authenticate('local'))

router.post('/logout', (req) => req.logout())

module.exports = router
