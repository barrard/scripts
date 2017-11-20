const should = require('should')
const database = require('./database')
const Account = require('../models/account')

describe('Account', () => {
  before(database.start)
  after(database.stop)

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
