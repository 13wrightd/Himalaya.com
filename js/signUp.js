var socket = io();

//var app = angular.module('myApp', []);

// app.controller('myCtrl', function($scope) {
// 	    $scope.searchtext= "";

// 	});
$(document).ready(function(){
	console.log('document ready');



// itemID: String,
// 	description: String,
// 	URL: String,
// 	name: String,
//     numberOfRatings: number,
// 	rating: number,
// 	dateAdded:

		
	$('#submitButton').click(function(){
	var msg=
	{
  		userID: Math.floor(Math.random()*10000000000000000),
  		userName: $('#userName').val(),
  		name: $('#name').val(),
  		email: $('#email').val(),
  		password: $('#password').val(),
  		phoneNum: $('#phoneNum').val(),
  		street: $('#street').val(),
  		city: $('#city').val(),
  		state: $('#state').val(),
  		zip: $('#zip').val(),
  		gender: $('#gender').val(),
  		age: $('#age').val(),
  		income: $('#income').val(),
  		type: $('#type').val(),
  		cardNum: $('#cardNum').val(),
  		month: $('#month').val(),
  		date: $('#date').val()
	}
	
  		console.log(msg);
		socket.emit('add user', msg);
	});

	// $('#refreshButton').click(function(){
	// 	socket.emit('get items');
	// });

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


