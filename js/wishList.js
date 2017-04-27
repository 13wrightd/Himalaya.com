var socket = io();

$(document).ready(function(){
	console.log('document ready');

		
	$('#showWishList').click(function(){
	var msg=
	{
  		itemName: $('#itemName').val(),
  		description: $('#exampleTextarea').val(),
  		reservePrice: $('#reservePrice').val(),
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


