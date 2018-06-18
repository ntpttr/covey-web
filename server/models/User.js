// server/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

let userSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    groups: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Group' } ]
});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
}

userSchema.methods.addGroup = function(group_id) {
    if (this.groups.indexOf(group_id) === -1) {
        this.groups.push(group_id);
    }
    return this.save();
}

userSchema.methods.deleteGroup = function(group_id) {
    this.groups = this.groups.filter(function(id) { return id !== group_id; });
    return this.save();
}

module.exports = mongoose.model('User', userSchema);
