const mongoose = require('mongoose')

function init(app) {
  // All Mongo info is set with environment variables.
  let mongo_user = process.env.MONGO_USER || 'username'
  let mongo_pass = process.env.MONGO_PASS || 'password'
  let mongo_host = process.env.MONGO_HOST || 'localhost'
  let mongo_spec = `mongodb://${mongo_user}:${mongo_pass}@${mongo_host}/scripts`

  // Connect to the mongo instance described in the environment.
  mongoose.connect(mongo_spec, {
    useMongoClient: true,
  })
  mongoose.Promise = global.Promise

  // Forward the Mongoose instance.
  return mongoose
}

module.exports = init
