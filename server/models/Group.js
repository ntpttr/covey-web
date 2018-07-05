// server/models/Group.js

const mongoose = require('mongoose');

let groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    users: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ]
});

groupSchema.methods.addUser = function(userId) {
    if (this.users.indexOf(userId) === -1) {
        if (mongoose.Types.ObjectId.isValid(userId)) {
            this.users.push(userId);
        }
    }
    return this.save();
}

groupSchema.methods.deleteUser = function(userId) {
    var index = this.users.indexOf(userId);
    if (index >= 0) {
        this.users.splice(index, 1);
    }
    return this.save();
}

module.exports = mongoose.model('Group', groupSchema);
