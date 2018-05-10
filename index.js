//Core App
const express = require('express');
const app = express();

// Load in Routes
const index = require('./routes/index');
const users = require('./routes/users');



//Middlewares/ Utils/ Helpers
const bodyParser = require('body-parser');

//Database setup to mlab
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI);



// Wrap Express app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//prepend the string
app.use('/',index);
app.use('/users', users);




















const PORT = process.env.PORT || 5000;
app.listen(PORT);
