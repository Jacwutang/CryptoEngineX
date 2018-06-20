//Core App
const express = require("express");
const app = express();

const config = require("./config");

// Load in Routes
const APIHandler = require("./api");

// Database setup connect to PostgreSQL
// const pg = require("pg");

//init knex with options
require("knex")(config.knex);

//Middlewares/ Utils/ Helpers
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//api routes
app.use("/api", APIHandler);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
