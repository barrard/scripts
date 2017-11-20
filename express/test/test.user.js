const should = require('should')
const mongoose = require('mongoose')
const Account = require('../models/account.js')

const mongo_user = process.env.MONGO_USER
const mongo_pass = process.env.MONGO_PASS
const mongo_host = process.env.MONGO_HOST
const mongo_spec = `mongodb://${mongo_user}:${mongo_pass}@${mongo_host}/test`

var db

describe('Account', () => {
  before((done) => {
    db = mongoose.connect(`mongodb://${mongo_host}/test`, {}, (err) => {
      if (err) {
        done(err)
      }
    })
    done()
  })

  beforeEach((done) => {
    var account = new Account({
      username: '12345',
      password: 'asdf',
    })

    account.save((err) => {
      if (err) {
        done(err)
      }
      done()
    })
  })

  after((done) => {
    mongoose.connection.close()
    done()
  })

  afterEach((done) => {
    Account.remove({}, done)
  })

  it('finds a user by username', (done) => {
    Account.findOne({ username: '12345' }, (err, account) => {
      account.username.should.eql('12345')
      console.log(`username: ${account.username}`)
      done()
    })
  })
})
