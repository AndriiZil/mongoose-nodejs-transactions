const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: String,
    age: Number
});

module.exports = model('user', UserSchema);
