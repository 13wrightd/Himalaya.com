var socket = io();

//var app = angular.module('myApp', []);

// app.controller('myCtrl', function($scope) {
// 	    $scope.searchtext= "";

// 	});
$(document).ready(function(){ //angular
});

$(document).ready(function(){
    $('[data-toggle="popover"]').popover(); 
});

$(document).ready(function(){
	console.log('document ready');


// itemID: String,
// 	description: String,
// 	URL: String,
// 	name: String,
//     numberOfRatings: number,
// 	rating: number,
// 	dateAdded:

		
	$('#button').click(function(){
	var msg=
	{
  		itemID: Math.floor(Math.random()*10000000000000000),
  		description: $('#description').val(),
  		URL: $('#URL').val(),
  		name: $('#name').val(),
  		rating: $('#rating').val(),
  		categoryID: $('#categoryID').val(),
  		numberOfRatings: $('#numberOfRatings').val()
	}
  		console.log(msg);
		socket.emit('button clicked', msg);
	});

	$('#refreshButton').click(function(){
		socket.emit('get items');
	});

	// $('#messageField').keypress(function(event){
	// 	var msg=
	// 	{
 //  			first: $('#firstNameField').val(),
 //  			last: $('#lastNameField').val(),
 //  			message: $('#messageField').val()
	// 	}
		
	// 	if(event.which == '13'){
	// 		socket.emit('button clicked', msg);
	// 	}
	// });

	socket.on('button was clicked', function(msg){
		console.log('successful add');
		//$('#chat').append('<li>'+msg.first+ " " + msg.last+ ": " +msg.message+'</li>');
	});


	socket.on('item list', function(msg){
		console.log(msg);
		$('#itemList').empty();
		for (var key in msg) {
		if (msg.hasOwnProperty(key)) {
			//$('#itemList').append('<li>'+msg[key].name+'</li>');
		$('#itemList').append("<li class='valign-wrapper'>"+   "<img class='valign'"+'   style="width:64px;height:64px;"        src="' + msg[key].URL + '" /> '  +msg[key].name+'</li>');

			
			console.log(msg[key]);
		}
}
		//$('#chat').append('<li>'+msg.first+ " " + msg.last+ ": " +msg.message+'</li>');
	});
});


