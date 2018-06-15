// server/models/Group.js

const mongoose = require('mongoose');

let groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    users: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ]
});

groupSchema.methods.addUser = function(user_id) {
    if (this.users.indexOf(user_id) === -1) {
        this.users.push(user_id);
    }
    return this.save();
}

groupSchema.methods.deleteUser = function(user_id) {
    this.users = this.users.filter(function(id) { return id !== user_id; });
    return this.save();
}

module.exports = mongoose.model('Group', groupSchema);
