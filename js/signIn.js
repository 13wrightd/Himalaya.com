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
  		username: $('#inputUsername').val(),
  		password: $('#inputPassword').val()
	}
	
  		console.log(msg);
		socket.emit('authenticate', msg);
	});

	socket.on('authentication data', function(msg){
		console.log('successful add');
		// Store
		localStorage.setItem("username", $('#inputUsername').val());
		localStorage.setItem("sessionString", msg);
		// console.log(sg);
		console.log("authenticated with sessionString: "+msg);
		// Retrieve
		//document.getElementById("result").innerHTML = localStorage.getItem("lastname");
	});
});


