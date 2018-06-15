// server/app.js

const config = require('../config');
const express = require('express');
const mongoose = require('mongoose');

// TODO(ntpttr): If we end up with a production mongodb somehow
// update this url from development to production.
const url = process.env.MONGODB_URI || config.db.development;
const User = require('./models/User');
const Group = require('./models/Group');

mongoose.connect(url, function(err) {
    if (err) throw err;
});
