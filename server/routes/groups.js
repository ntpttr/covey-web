const express = require('express');
const router = express.Router();

const Group = require('../models/Group');
const User = require('../models/User');
const groupController = require('../controllers/groups');

// List all groups
router.get('/', function(req, res) {
    Group.find({}, function(err, groups) {
        if (err) {
            res.json({'status': false,
                      'message': 'Database error finding groups!'});
        } else {
            res.json({'status': true,
                      'groups': groups});
        }
    });
});

// Get group by id
router.get('/:ident', function(req, res) {
    groupController.getGroup(req.params.ident, function(getRes) {
        res.json(getRes);
    });
});

// Create new group
router.post('/', function(req, res) {
    group = new Group(req.body);

    group.save(function(err) {
        if (err) {
            console.log(err.message);
            res.json({'status': false,
                      'message': 'Error saving group!'});
            return;
        }
        res.json({'status': true,
                  'group': group});
    });
});

// Delete group
router.delete('/:ident', function(req, res) {
    groupController.deleteGroup(req.params.ident, function(deleteRes) {
        res.json(deleteRes);
    });
});

// Add user to group
router.post('/:groupId/users/:userId', function (req, res, next) {
    var groupId = req.params.groupId;
    var userId = req.params.userId;
    Group.findById(groupId, function (err, group) {
        if (err) {
            if (err.name === 'CastError') {
                res.json({'status': false,
                          'message': 'Invalid Group ID!'});
            } else {
                res.json({'status': false,
                          'message':  err.message});
            }
            return;
        }
        User.findById(userId, function (err, user) {
            if (err) {
                if (err.name === 'CastError') {
                    res.json({'status': false,
                              'message': 'Invalid User ID!'});
                } else {
                    res.json({'status': false,
                              'message': err.message});
                }
                return;
            }
            try {
                group.addUser(user._id);
                user.addGroup(group._id);
                res.json({'status': true});
            } catch(err) {
                res.json({'status': false,
                          'message': 'Error adding user to group.'});
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
                res.json({'status': false,
                          'message': 'Invalid Group ID.'});
            } else {
                res.json({'status': false,
                          'message': err.message});
            }
            return;
        }
        User.findById(userId, function(err, user) {
            if (err) {
                if (err.name === 'CastError') {
                    res.json({'status': false,
                              'message': 'Invalid User ID.'});
                } else {
                    res.json({'status': false,
                              'message': err.message});
                }
                return;
            }
            if (group) group.deleteUser(userId);
            if (user) user.deleteGroup(groupId);
            res.json({'status': true});
        });
    });
});

module.exports = router;
