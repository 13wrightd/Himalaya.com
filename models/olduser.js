'use strict';

var mongoose = require('mongoose');

var oldUserSchema = mongoose.Schema({

	oldUserID: Number,
	oldUserName: String,
	name: String,
	email: String,
	password: String,
	phoneNum: String,
	street: String,
	city: String,
	state: String,
	zip: String,
	gender: String,
	age: String,
	type: String,
	cardNum: String,
	month: String,
	date: String,

	dateAdded: { type: Date, default: Date.now }

});

var oldUsers = mongoose.model('oldUser', oldUserSchema);

module.exports = oldUsers;


