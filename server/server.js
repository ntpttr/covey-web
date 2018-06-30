// server/app.js

const config = require('../config');
const express = require('express');
const next = require('next');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');

// TODO(ntpttr): If we end up with a production mongodb somehow
// update this url from development to production.
const dev = process.env.NODE_ENV !== 'production';
const url = process.env.MONGODB_URI || config.db.development;
const port = parseInt(process.env.PORT, 10) || 3000;
const User = require('./models/User');
const Group = require('./models/Group');
const users = require('./routes/users');
const groups = require('./routes/groups');

mongoose.connect(url, function(err) {
    if (err) throw err;
});

const app = next({dev});

app.prepare()
.then(() => {
    const server = express();

    server.use(express.static(__dirname + '/../client'));

    // parse application/json
    server.use(bodyParser.json());
    // parse application/x-www-form-urlencoded
    server.use(bodyParser.urlencoded({extended: true}));

    server.use('/groups', groups);
    server.use('/users', users);

    server.listen(port);
    console.log("Server listening on port " + port + "...");
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1);
});
