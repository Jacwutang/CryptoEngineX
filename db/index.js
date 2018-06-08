//PostgreSQL setup
const pgp = require("pg-promise")();
const connectionString =
  process.env.ELEPHANTSQL_URL ||
  "postgres//localhost:5432/CryptoEngineX_development";
const db = pgp(connectionString);

// module.exports = {
//   query: (text, params, callback) => db.query(text, params, callback)
// };

module.exports = db;
