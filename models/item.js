'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
	itemID: String,
	description: String,
	URL: String,
	name: String,
    numberOfRatings: number,
	rating: number,
	dateAdded: { type: Date, default: Date.now }
});

var messages = mongoose.model('message', messageSchema);

module.exports = messages;