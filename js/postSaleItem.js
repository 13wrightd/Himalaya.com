/*
This file implements the client-side javascript code to take in values from html fields on the poatAuctionItem.html
page, construct a "msg" object from those values, and pass it to the serves for further processing
*/

var socket = io();

$(document).ready(function(){
	console.log('document ready');

		
	$('#postAuctionButton').click(function(){
	var msg=
	{
  		itemName: $('#itemName').val(),
  		description: $('#exampleTextarea').val(),
  		fixedPrice: $('#fixedPrice').val(),
  		itemPictureURL: $('#itemPicture').val(),
  		//itemDescriptionURL: $('#itemDescriptionURL').val(),
  		itemCategory: $('#itemCategory').val(),
  		username: localStorage.getItem('username'),
  		sessionString: localStorage.getItem('sessionString'),
  		itemLocation: $('#itemLocation').val()
	}
	
  		console.log(msg);
		socket.emit('post auction', msg);
	});
	
});

