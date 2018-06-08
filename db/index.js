//PostgreSQL setup
// const pgp = require("pg-promise")();
// const connectionString =
//   process.env.ELEPHANTSQL_URL ||
//   "postgres//localhost:5432/CryptoEngineX_development";
// const db = pgp(connectionString);

// module.exports = {
//   query: (text, params, callback) => db.query(text, params, callback)
// };

const connectionString =
  process.env.PG_CONNECTION_STRING ||
  "postgres//localhost:5432/CryptoEngineX_development";

const db = require("knex")({
  client: "pg",
  connection: connectionString,
  debug: true
});

module.exports = db;
