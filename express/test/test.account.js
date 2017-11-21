const should = require('should')
const database = require('./database')
const Account = require('../models/account')

const dummy = {
  username: '12345',
  password: 'asdf',
}

describe('Account', () => {
  before(database.start)
  after(database.stop)

  afterEach((done) => {
    Account.remove({}, done)
  })

  it('finds a user by username', (done) => {
    let account = new Account(dummy)

    account.save((err) => {
      if (err) done(err)

      Account.findOne({ username: dummy.username }, (err, account) => {
        if (err) done(err)

        account.username.should.eql(dummy.username)
        done()
      })
    })
  })

  it('handles user registration', (done) => {
    let account = new Account({ username: dummy.username })

    Account.register(account, dummy.password, (err, _) => {
      if (err) done(err)

      Account.authenticate()(dummy.username, dummy.password, (err, _) => {
        err ? done(err) : done()
      })
    })
  })
})
