//PostgreSQL setup

const connectionString =
  process.env.PG_CONNECTION_STRING ||
  "postgres//localhost:5432/CryptoEngineX_development";

const db = {
  client: "pg",
  connection: connectionString,
  debug: true
};

module.exports = db;
