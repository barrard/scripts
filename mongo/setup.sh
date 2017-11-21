#!/bin/sh

echo $MONGO_DBPATH

# Run MongoDB in the background.
mongod --dbpath=$MONGO_DBPATH &

# Wait until MongoDB responds to the help command.
starting=1
while [ $starting -ne 0 ]; do
  echo "MongoDB is starting..."
  sleep 1

  mongo admin --eval help >/dev/null 2>&1
  starting=$?
done

# Create the scripts database and a user
# with MONGO_USER and MONGO_PASS.
echo "Creating users and databases..."
mongo admin --eval "
  db.createUser({
    user: '$MONGO_USER',
    pwd: '$MONGO_PASS',
    roles: [{
      role: 'readWrite',
      db: '$MONGO_DBNAME'
    }]
  });
"

# TODO: Save the demo records in `data.js`.

# Shutdown, but return the status from the query.
success=$?
mongod --shutdown --dbpath=$MONGO_DBPATH
exit $success
