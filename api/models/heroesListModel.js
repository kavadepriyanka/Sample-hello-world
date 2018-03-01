'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HeroSchema = new Schema({
    name: {
        type: String,
        Required: 'Kindly enter the name of the Hero'
    },
    id: {
        type: Number
    }
});

module.exports = mongoose.model('Heroes', HeroSchema);