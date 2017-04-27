var socket = io();

$(document).ready(function(){

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
	};
	
		socket.emit('wishList', msg);

		socket.on('search results', function(msg){
		console.log(msg);
		$('#resultList').empty();
		jQuery.each( msg, function( i, val ) {
			//var imgString='<img src='
   			//$("#searchList").append("<li  class='list-group-item'>"+ val.comment+'<span style="float:right">'+val.star+'</span>'+'</li>');
	//style='width:50%'
		$('#resultList').append("<li  class='valign-wrapper list-group-item'>"+"<a href='item_page.html?id="+msg[i]._id+"'> <img class='valign'"+' style="width:20%; " src="' + msg[i].url + '" /> '  +msg[i].title+"<span style='float:right'>$"+msg[i].price+'</span><a></li>');

			onClick='item_page.html?id="+msg[i]._id+"'

	});
	
});


