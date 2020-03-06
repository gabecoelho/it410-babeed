var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Diaper = new Schema({
    type: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Diaper', Diaper)