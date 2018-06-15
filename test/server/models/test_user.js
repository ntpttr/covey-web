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

describe('user', function() {

    it('should be invalid if name is empty', function() {
        var u = new User({'password': 'pass'});
        u.validate(function(err) {
            expect(err.errors.name).to.exist;
        });
    });

    it('should be invalid if password is empty', function() {
        var u = new User({'name': 'test_user'});
        u.validate(function(err) {
            expect(err.errors.password).to.exist;
        });
    });

    it('should add groups to its group list', function(done) {
        var u = new User(testUser);
        var g = new Group(testGroup);
        expected = [g._id];

        u.addGroup(g._id);
        expect(u.groups).to.eql(expected);
        done();
    });

    it('should delete a group from group list', function(done) {
        var u = new User(testUser);
        var g = new Group(testGroup);
        expected = [];

        u.deleteGroup(g._id);

        expect(u.groups).to.eql(expected);
        done()
    });

});
