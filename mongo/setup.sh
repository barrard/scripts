#!/bin/sh

# Run MongoDB in the background.
mongod &

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
    roles: [{ role: 'readWrite', db: 'scripts' }]
  });
"

# TODO: Save the demo records in `data.js`.

# Shutdown, but return the status from the query.
success=$?
mongod --shutdown
exit $success
