// server/app.js

const config = require('../config');
const express = require('express');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');

// TODO(ntpttr): If we end up with a production mongodb somehow
// update this url from development to production.
const url = process.env.MONGODB_URI || config.db.development;
const port = parseInt(process.env.PORT, 10) || 8080;
const User = require('./models/User');
const Group = require('./models/Group');
const login = require('./routes/login');
const groups = require('./routes/groups');
const users = require('./routes/users');

var app = express();

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use('/login', login);
app.use('/groups', groups);
app.use('/users', users);

mongoose.connect(url, function(err) {
    if (err) throw err;
});

app.listen(port);
console.log("Server listening on port " + port + "...");
