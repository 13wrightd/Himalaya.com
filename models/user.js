'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

	userID: Number,
	userName: String,
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

var users = mongoose.model('user', userSchema);

module.exports = users;


