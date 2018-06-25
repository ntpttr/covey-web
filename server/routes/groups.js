const express = require('express');
const router = express.Router();

const Group = require('../models/Group');
const User = require('../models/User');

// List all groups
router.get('/', function(req, res) {
    Group.find({}, function(err, groups) {
        res.json(groups);
    });
});

// Get specific group
router.get('/:groupId', function(req, res) {
    id = req.params.groupId;
    Group.findById(id, function(err, group) {
        res.json(group);
    });
});

// Create new group
router.post('/', function(req, res) {
    group = new Group(req.body);

    group.save(function(err) {
        if (err) {
            var errMessage = 'Error saving group!';
            console.log(err.message);
            res.send(errMessage);
            return;
        }
        res.json(group);
    });
});

// Delete group
router.delete('/:groupId', function(req, res) {
    id = req.params.groupId;
    Group.remove({_id: id}, function(err) {
        if (err) {
            res.send('Error deleting group!');
        } else {
            res.send('Group ' + id + ' deleted successfully.');
        }
    });
});

// Add user to group
router.post('/:groupId/users/:userId', function (req, res, next) {
    var groupId = req.params.groupId;
    var userId = req.params.userId;
    Group.findById(groupId, function (err, group) {
        if (err) {
            if (err.name === 'CastError') {
                res.json({'err': 'Invalid Group ID!'});
            } else {
                res.json({'err': err.message});
            }
            return;
        }
        User.findById(userId, function (err, user) {
            if (err) {
                if (err.name === 'CastError') {
                    res.json({'err': 'Invalid User ID!'});
                } else {
                    res.json({'err': err.message});
                }
                return;
            }
            try {
                group.addUser(user._id);
                user.addGroup(group._id);
                res.json({'group': group, 'user': user});
            } catch(err) {
                res.json({'err': err});
            }
        });
    });
});

// Remove user from group
router.delete('/:groupId/users/:userId', function(req, res) {
    var groupId = req.params.groupId;
    var userId = req.params.userId;
    Group.findById(groupId, function(err, group) {
        if (err) {
            if (err.name === 'CastError') {
                res.json({'err': 'Invalid Group ID.'});
            } else {
                res.json({'err': err.message});
            }
            return;
        }
        User.findById(userId, function(err, user) {
            if (err) {
                if (err.name === 'CastError') {
                    res.json({'err': 'Invalid User ID.'});
                } else {
                    res.json({'err': err.message});
                }
                return;
            }
            if (group) group.deleteUser(userId);
            if (user) user.deleteGroup(groupId);
            res.json({'group': group, 'user': user});
        });
    });
});

module.exports = router;
