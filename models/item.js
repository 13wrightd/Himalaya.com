'use strict';

var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
	itemID: Number,
	description: String,
	URL: String,
	name: String,
    numberOfRatings: Number,
	rating: Number,
	categoryID: Number,
	dateAdded: { type: Date, default: Date.now }

});

var Users = mongoose.Schema({
	username: String,
	password: String,
	email: String,
	addresses:[
	{
		street: String,
		city: String,
		state: String,
		zip: Number
	}
	],
	credit_cards:[
	{
		type: String,
		card_number: Number,
		expiration_date: Number
	}
	],
	phone_numbers:[
	{
		number: Number
	}
	],
	ratings:[
	{
		comment: String,
		star: Number
	}
	],
	
})
//TODO
//db.collection.createIndex( <key and index type specification>, { unique: true } )
//^ enforce uniqueness on certain fields

var items = mongoose.model('item', itemSchema);

module.exports = items;