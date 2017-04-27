var socket = io();

$(document).ready(function(){
	var msg=JSON.parse(localStorage.getItem('wishlist'));
	console.log(msg);
	jQuery.each( msg, function( i, val ) {

	var a="<li  class='valign-wrapper col-sm-6 list-group-item'>"
							+"<a href='item_page.html?id="+msg[i]._id+"'>"+
							msg[i].title+"   &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp " +' &nbsp&nbsp&nbsp&nbspsold by: '+msg[i].seller+ ' &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspfor price of: '+msg[i].price+   '  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp    units: '+msg[i].amount 

							+'</a></li>';

							console.log(a);
		$('#results').append(a);

	});
	
});

