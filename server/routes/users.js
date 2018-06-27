const express = require('express');
const router = express.Router();

const User = require('../models/User');

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
router.get('/:username', function(req, res) {
    name = req.params.username;
    User.findOne({username: name}, function(err, user) {
        if (err) {
            res.json({'status': false,
                      'message': 'Database error finding user ' + name + '!'});
        } else if (user) {
            res.json({'status': true, 'user': user});
        } else {
            res.json({'status': false,
                      'message': 'User ' + name + ' not found!'});
        }
    });
});

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
            console.log(err.message);
            res.json({'status': false,
                      'message': errMessage});
            return;
        }
        res.json(user);
    });
});

// Delete user
router.delete('/:username', function(req, res) {
    name = req.params.username;
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
});

module.exports = router;
