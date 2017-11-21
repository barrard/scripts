const mongoose = require('mongoose')

function init(app) {
  // All Mongo info is set with environment variables.
  let user = process.env.MONGO_USER
  let pass = process.env.MONGO_PASS
  let host = process.env.MONGO_HOST
  let name = process.env.MONGO_DBNAME
  let spec = `mongodb://${user}:${pass}@${host}/${name}`

  // Connect to the mongo instance described in the environment.
  mongoose.connect(spec, { useMongoClient: true })
  mongoose.Promise = global.Promise

  // Forward the Mongoose instance.
  return mongoose
}

module.exports = init
