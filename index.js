//Core App
const express = require("express");
const app = express();

// Load in Routes
const index = require("./routes/index");
const users = require("./routes/users");

//Middlewares/ Utils/ Helpers
const bodyParser = require("body-parser");

//Database setup to mlab
// const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
// const keys = require("./config/keys");
// mongoose.connect(keys.mongoURI);

// Wrap Express app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//prepend the string
app.use("/", index);
app.use("/users", users);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
