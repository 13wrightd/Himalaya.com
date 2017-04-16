'use strict';

var mongoose = require('mongoose');

/*var itemSchema = mongoose.Schema({
	itemID: Number,
	description: String,
	URL: String,
	name: String,
    numberOfRatings: Number,
	rating: Number,
	categoryID: Number,
	dateAdded: { type: Date, default: Date.now }

});*/

//TJ stuff April 16, 2017 starts here


//users schema (made up of individuals(who can buy and sell) and suppliers(who can only sell))
var userSchema = mongoose.Schema({
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
	notifications:[
	{
		item_name: String,
		URL: String,
		seller: {
		type: mongoose.Schema.Types.ObjectId
		},
		start_time: Date,
		finish_time: Date,
		reserve_price: Number,
		ending_price: Number
	}
	],
	//individuals
	is_individual: Boolean,
	name: String,
	age: Number,
	gender: String,
	income: Number,
	wishlist:[
	{
		item_id: Number,
		URL: String
	}
	],
	//suppliers
	is_supplier: Boolean,
	company_name: String,
	company_category: String,
	revenue: Number,
	point_of_contact: String,

	});



//make separate collection for categories
var categories = new mongoose.schema{

}

var itemSchema = new mongoose.Schema({
	URL: String,
	description: String,
	category: String,
	address:{
		street: String,
		city: String,
		state: String,
		zip: Number
	},
	ratings:[
	{
		comment: String,
		star: Number
	}
	]
});

var item = mongoose.model('item', itemSchema);

//auctions

var auctionSchema = new mongoose.Schema({
	item_name: String,
	category: String,
	URL: String,
	address:{
		street: String,
		city: String,
		state: String,
		zip: Number
	},
	seller: {
		type: mongoose.Schema.Types.ObjectId},
	start_time: { type: Date, default: Date.now },
	finish_time: Date,
	reserve_price: Number,
	current_bid: {
		amount: Number,
		bidder: {type: mongoose.Schema.Types.ObjectId}
	},
	//array of bidders that are notified at end of auction
	bidders:[{type: mongoose.Schema.Types.ObjectId,
		unique: true, amount: Number}]


});


var auction = mongoose.model('auction', auctionSchema);

var saleSchema = new mongoose.Schema({
	item_name: String,
	URL: String,
	seller: {
		type: mongoose.Schema.Types.ObjectId},
	buyer: {
		type: mongoose.Schema.Types.ObjectId},
	sale_time: { type: Date, default: Date.now },
	price: Number,
	amount: Number
});
 var sale = mongoose.model('sale',saleSchema);

//TODO
//db.collection.createIndex( <key and index type specification>, { unique: true } )
//^ enforce uniqueness on certain fields

//var items = mongoose.model('item', itemSchema);

module.exports = items;