'use strict';

var mongoose = require('mongoose');


//TJ stuff April 16, 2017 starts here

//users schema (made up of individuals(who can buy and sell) and suppliers(who can only sell))
var userSchema = mongoose.Schema({
	username: String,
	password: String,
	email: String,
	session_date: { type: Date, default: Date.now },//.addMinutes(10)},
	session_string: String,
	addresses:[
	{
		street: String,
		city: String,
		state: String,
		zip: String
	}],
	credit_cards:[{
		cardtype: String,
		number: String,
		month: String,
		date: String
		
	}],
	phone_numbers:[
	{
		number: String
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
		itemId: String,
		auctionId: String,
		type1: String,
		URL: String,
		seller: String,
		start_time: Date,
		finish_time: Date,
		reserve_price: String,
		ending_price: String,
		buyer: String
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

var categoriesSchema =  mongoose.Schema({
	category_name: String,
	category_parent: String,
	category_children: [String]
});

var categories = mongoose.model('categories', categoriesSchema);

var saleItemSchema =  mongoose.Schema({
	seller: String,
	description: String,
	title: String,
	url: String,
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

var auctionSchema = mongoose.Schema({
	item_name: String,
	category: String,
	URL: String,
	description: String,
	address:{
		street: String,
		city: String,
		state: String,
		zip: Number
	},
	seller: String,
	start_time: { type: Date, default: Date.now },
	finish_time: Date,
	reserve_price: Number,
	current_bid: {
		username: String,
		amount: Number
	},
	//array of bidders that are notified at end of auction
	bids:[
	{
		username: String,
		amount: Number
	}
	]


});


var auction = mongoose.model('auction', auctionSchema);

var saleSchema =  mongoose.Schema({
	type: String,// sale or auction
	item_name: String,
	seller: String,
	username: String,
	sale_time: { type: Date, default: Date.now },
	price: Number,
	amount: Number,
	itemId: String
});

var sale = mongoose.model('sale',saleSchema);

module.exports = {saleItem,sale,auction,user,categories};
