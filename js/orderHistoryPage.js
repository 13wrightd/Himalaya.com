/*
This file implements the client-side javascript code to take in values from html fields on the poatAuctionItem.html
page, construct a "msg" object from those values, and pass it to the serves for further processing
*/

var socket = io();

$(document).ready(function(){
	console.log('document ready');
	socket.emit('get sales', localStorage.getItem('username'));

		
	socket.on('sales', function(msg){
		console.log(msg);
		jQuery.each( msg, function( i, val ) {

	var a="<li  class='valign-wrapper col-sm-6 list-group-item'>"
							+"<a href='item_page.html?id="+msg[i].itemId+"'>"+
							msg[i].item_name+"   &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp " +' &nbsp&nbsp&nbsp&nbspsold by: '+msg[i].seller+ ' &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspfor price of: '+msg[i].price+   '  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp    units: '+msg[i].amount 

							+'</a></li>';

							console.log(a);
		$('#results').append(a);

	});

	});

	
});



// "type": "sale",
//     "item_name": "Pancake Bunny",
//     "seller": "13wrightd",
//     "username": "13wrightd",
//     "price": 50,
//     "amount": 1,