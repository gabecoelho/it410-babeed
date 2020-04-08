const mongoose = require('mongoose')
const Schema = mongoose.Schema

var User = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', User)