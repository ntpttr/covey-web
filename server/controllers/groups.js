const Group = require('../models/Group');

function getGroup(ident, callback) {
    getGroupById(ident, function(res) {
        if (res.status) {
            callback(res);
        } else {
            // If user not found by ID, try name.
            getGroupsByName(ident, callback);
        }
    });
}

function getGroupById(id, callback) {
    Group.findById(id, function(err, group) {
        if (err) {
            callback({'status': false,
                      'message': 'Database error finding group with id ' + id + '!'});
        } else if (group) {
            callback({'status': true, 'groups': [group]});
        } else {
            callback({'status': false,
                      'message': 'Group with ID ' + id + ' not found!'});
        }
    }); 
}

function getGroupsByName(name, callback) {
    Group.find({name: name}, function(err, groups) {
        if (err) {
            callback({'status': false,
                      'message': 'Database error finding group with name ' + name + '!'});
        } else if (groups.length > 0) {
            callback({'status': true, 'groups': groups});
        } else {
            callback({'status': false,
                      'message': 'Group with name ' + name + ' not found!'});
        }
    }); 
}

function deleteGroup(ident, callback) {
    deleteGroupById(ident, function(res) {
        if (res.status) {
            callback(res);
        } else {
            // If group not found by ID, try name.
            deleteGroupByName(ident, callback);
        }
    });
}

function deleteGroupById(id, callback) {
    Group.findByIdAndRemove(id, function(err, group) {
        if (err) {
            callback({'status': false,
                      'message': 'Database error finding group with id ' + id + '!'});
        } else if (group) {
            callback({'status': true});
        } else {
            callback({'status': false,
                      'message': 'group with ID ' + id + ' not found!'});
        }
    });
}

function deleteGroupByName(name, callback) {
    Group.find({name: name}, function(err, groups) {
        if (err) {
            callback({'status': false,
                      'message': 'Database error deleting group ' + name + '!'});
        } else if (groups.length == 0) {
            callback({'status': false,
                      'message': 'Group with the name ' + name + ' not found!'});
        } else if (groups.length > 1) {
            callback({'status': false,
                      'message': 'Multiple groups found with name ' + name + '. Must delete by ID.'});
        } else {
            var group = groups[0];
            try {
                group.remove();
                callback({'status': true});
            } catch(err) {
                callback({'status': false,
                          'message': 'Error deleting group ' + name + '!'});
            }
        }
    }); 
}


module.exports = { getGroup, deleteGroup };
