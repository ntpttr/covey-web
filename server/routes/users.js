const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

router.get('/:userId', function(req, res) {
    id = req.params.userId;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

router.post('/', function(req, res) {
    user = new User(req.body);

    user.save(function(err) {
        if (err) {
            var errMessage = '';
            if (err.code === 11000) {
                // Duplicate username found
                errMessage = 'User already exists!';
            } else {
                errMessage = 'Error saving user!';
            }
            console.log(err.message);
            res.send(errMessage);
            return;
        }
        res.json(user);
    });
});

router.delete('/:userId', function(req, res) {
    id = req.params.userId;
    User.remove({_id: id}, function(err) {
        if (err) {
            res.send('Error deleting user!');
        } else {
            res.send('User ' + id + ' deleted successfully.');
        }
    });
});

module.exports = router;            
