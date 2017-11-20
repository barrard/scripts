const mongoose = require('mongoose')

function start(done) {
  let spec = `mongodb://${process.env.MONGO_HOST}/scripts-test`
  mongoose.connect(spec, { useMongoClient: true }, (err) => {
    if (err) {
      done(err)
    }
  })

  mongoose.Promise = global.Promise

  done()
}

function stop(done) {
  mongoose.connection.close()
  done()
}

module.exports = {
  start: start,
  stop: stop,
}
