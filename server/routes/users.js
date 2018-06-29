const express = require('express');
const router = express.Router();

const User = require('../models/User');

var authenticate = function(creds, callback) {
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

var getUserById = function(req, res, next) {
    var id = req.params.ident;
    User.findById(id, function(err, user) {
        if (err) {
            // A name may have been passed, check getUserByName
            next();
        } else {
            if (user) {
                res.json({'status': true, 'user': user});
            } else {
                // A name may have been passed, check getUserByName
                next();
            }
        }
    });
}

var getUserByName = function(req, res) {
    var name = req.params.ident;
    User.findOne({username: name}, function(err, user) {
        if (err) {
            res.json({'status': false,
                      'message': 'Database error finding user with name ' + name + '!'});
        } else if (user) {
            res.json({'status': true, 'user': user});
        } else {
            res.json({'status': false,
                      'message': 'User with name or ID ' + name + ' not found!'});
        }
    });
}

var deleteUserById = function(req, res, next) {
    var id = req.params.ident;
    User.findByIdAndRemove(id, function(err, user) {
        if (err) {
            // A name may have been passed, try deleteUserByName
            next();
        } else {
            if (user) {
                res.json({'status': true});
            } else {
                res.json({'status': false,
                          'message': 'User with ID ' + id + ' not found!'});
            }
        }
    });
}

var deleteUserByName = function(req, res) {
    var name = req.params.ident;
    User.findOneAndRemove({username: name}, function(err, user) {
        if (err) {
            res.json({'status': false,
                      'message': 'Database error deleting user ' + name + '!'});
        } else if (user) {
            res.json({'status': true,
                      'message': 'User ' + name + ' deleted successfully.'});
        } else {
            res.json({'status': false,
                      'message': 'User ' + name + ' not found.'});
        }
    });
}

// List all users
router.get('/', function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            res.json({'status': false,
                      'message': 'Database error finding users!'});
        } else {
            res.json({'status': true,
                      'users': users});
        }
    });
});

// Get specific user
router.get('/:ident', [getUserById, getUserByName]);

// Create new user
router.post('/', function(req, res) {
    user = new User(req.body);

    user.save(function(err) {
        if (err) {
            var errMessage = '';
            if (err.code === 11000) {
                // Duplicate username found
                errMessage = 'Username already exists!';
            } else {
                errMessage = 'Error saving user!';
            }
            res.json({'status': false,
                      'message': errMessage});
            return;
        }
        res.json({'status': true,
                  'user': user});
    });
});

// Login
router.post('/login', function(req, res) {
    var creds = req.body;
    authenticate(creds, function(auth) {
        res.json(auth);
    });
});

// Delete user
router.delete('/:ident', [deleteUserById, deleteUserByName]);

module.exports = router;
