const mongoose = require('mongoose')

const Account = new mongoose.Schema({
  username: String,
  password: String,
})

Account.plugin(require('passport-local-mongoose'))

module.exports = mongoose.model('Account', Account)
