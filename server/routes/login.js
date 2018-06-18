const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/', function(req, res) {
    var creds = req.body;
    authenticate(creds, function(auth) {
        res.json(auth);
    });
});

function authenticate(creds, callback) {
    var username = creds.username;
    var password = creds.password;
    User.findOne({username: username}, function(err, user) {
        if (err) { // err indicates error, not no result found
            callback({'err': err});
            return;
        }

        if (user) { // found the user!
            user.comparePassword(password, function(err, isMatch) {
                callback({'status': isMatch, 'foundUser': true});
            });
        } else {
            callback({'status': false, 'foundUser': false});
        }
    });
};

module.exports = router;            
