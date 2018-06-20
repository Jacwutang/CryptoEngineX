//PostgreSQL setup

const connectionString =
  process.env.PG_CONNECTION_STRING ||
  "postgres//localhost:5432/CryptoEngineX_development";

const promise = require("bluebird");

const pg = {
  client: "pg",
  connection: connectionString,
  useNullAsDefault: true,
  promiseLib: promise,
  migrations: {
    directory: '../db/migrations'
  }
  debug: true
};

module.exports = pg;
