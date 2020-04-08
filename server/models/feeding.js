var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Feeding = new Schema({
    username: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Feeding', Feeding)