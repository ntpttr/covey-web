const expect = require('chai').expect;
const mongoose = require('mongoose');
const utils = require('../../utils');

const Group = require('../../../server/models/Group');
const User = require('../../../server/models/User');


// User model
var testUser = {
    'name': 'testuser',
    'password': 'Password123'
};

// Group model
var testGroup = {
    'name': 'testgroup'
};

describe('group', function() {

    it('should be invalid if name is empty', function() {
        var g = new Group({});
        g.validate(function(err) {
            expect(err.errors.name).to.exist;
        });
    });

    it('should add users to its user list', function(done) {
        var u = new User(testUser);
        var g = new Group(testGroup);
        expected = [u._id];

        g.addUser(u._id);
        expect(g.users).to.eql(expected);
        done();
    });

    it('should delete a user from group list', function(done) {
        var u = new User(testUser);
        var g = new Group(testGroup);
        expected = [];

        g.deleteUser(u._id);

        expect(g.users).to.eql(expected);
        done()
    });

});
