# Scripts

## Setup & Usage

There are two ways of running `scripts` in development. The first leverages
`docker` and `docker-compose`. If those tools arent' available or you'd prefer
not to use them, see the 'Manual' section below to manually run the servers.

### With Docker

To use this setup, you need `docker` and `docker-compose` installed.

```sh
# copy the default .env file
cp .env.default .env

# create docker images
docker-compose build

# install express node_modules
docker-compose run express npm install
# install react node_modules
docker-compose run react npm install

# run both servers and a mongo instance
docker-compose up
```

### Manually

To use this setup, you need `mongodb` and `node` installed.

1. #### Environment

To use mongo locally, we'll add some data directories at `./mongo/data/db`.
Change the `.env` file to reflict this.

- First, make a local .env copy: `cp .env.default .env`
- Then, (in `.env`) change `MONGO_DBPATH` from `/data/db` to `data/db`
  (drop the leading slash).

All settings ending in `HOST` in the `.env` file need to be changed to `localhost`.

- Change all settings ending in `HOST` (in `.env`) to `localhost`.

Last, we need to load the settings into every shell we use in development.

- In order for the environment variables to be visible to the servers and
  mongo, then need to be `export`ed. Run the following (in every shell):

  ```sh
    for setting in $(cat .env); do
      export $setting
    done
  ```

2. #### Mongo

```sh
cd mongo

# ensure there's a local data directory
[ -d data/db ] || mkdir -p data/db

# create user and database
./setup.sh

# start the mongo daemon
mongod --dbpath $MONGO_DBPATH
```

3. #### Express

```sh
cd express

# install node_modules
npm install

# start the express server
npm start
```

4. #### React

```sh
cd react

# install node_modules
npm install

# start react-server
npm start
```
