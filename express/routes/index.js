const express = require('express')
const passport = require('passport')

const router = express.Router()

router.use('/accounts', require('./accounts'))

module.exports = router
