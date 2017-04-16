'use strict';

var mongoose = require('mongoose');


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
var user = mongoose.model('user', userSchema);



//make separate collection for categories

var categoriesSchema = new mongoose.schema{
	category_name: String,
	category_parent: String,
	category_children: [String]
}

var categories = mongoose.model('categories', categoriesSchema);

var saleItemSchema = new mongoose.Schema({
	seller: {
		type: mongoose.Schema.Types.ObjectId},
	description: String,
	price: Number,
	category: String,
	quantity: Number,
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

var saleItem = mongoose.model('saleItem', saleItemSchema);




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
	type: String,// sale or auction
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

module.exports = {saleItem,sale,auction,user,categories};

