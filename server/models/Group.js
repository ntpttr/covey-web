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
    console.log(this.users);
    this.users = this.users.filter(function(id) { return id != userId; });
    console.log(this.users);
    return this.save();
}

module.exports = mongoose.model('Group', groupSchema);
