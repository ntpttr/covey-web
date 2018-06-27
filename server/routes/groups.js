const express = require('express');
const router = express.Router();

const Group = require('../models/Group');
const User = require('../models/User');

var getGroupById = function(req, res, next) {
    var id = req.params.ident;
    Group.findById(id, function(err, group) {
        if (err) {
            // A name may have been passed, check getGroupsByName
            next();
        } else {
            if (group) {
                res.json({'status': true, 'group': group});
            } else {
                res.json({'status': false,
                          'message': 'Group with ID ' + id + ' not found!'});
            }
        }
    });
}

var getGroupsByName = function(req, res) {
    var name = req.params.ident;
    Group.find({name: name}, function(err, groups) {
        if (err) {
            res.json({'status': false,
                      'message': 'Database error finding groups with name ' + name + '!'});
        } else if (groups.length > 0) {
            res.json({'status': true, 'groups': groups});
        } else {
            res.json({'status': false,
                      'message': 'Group with name ' + name + ' not found!'});
        }
    });
}

var deleteGroupById = function(req, res, next) {
    var id = req.params.ident;
    Group.findByIdAndRemove(id, function(err) {
        if (err) {
            // A name may have been passed, try deleteGroupByName
            next();
        } else {
            res.json({'status': true});
        }
    });
}

var deleteGroupByName = function(req, res) {
    var name = req.params.ident;
    Group.find({name: name}, function(err, groups) {
        if (err) {
            res.json({'status': false,
                      'message': 'Database error deleting group with name ' + name + '!'});
        } else if (groups.length == 0) {
            res.json({'status': false,
                      'message': 'Group with name ' + name + ' not found!'});
        } else if (groups.length > 1) {
            res.json({'status': false,
                      'message': 'Multiple groups found with name ' + name + '. Must delete by ID.'});
        } else {
            var group = groups[0];
            try {
                group.remove();
                res.json({'status': true});
            } catch(err) {
                res.json({'status': false,
                          'message': 'Error deleting group ' + name + '!'});
            }
        }
    });
}

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
router.get('/:ident', [getGroupById, getGroupsByName]);

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
router.delete('/:ident', [deleteGroupById, deleteGroupByName]);

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
