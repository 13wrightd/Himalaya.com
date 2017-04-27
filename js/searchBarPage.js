var socket = io();


Url = {
    get get(){
        var vars= {};
        if(window.location.search.length!==0)
            window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){
                key=decodeURIComponent(key);
                if(typeof vars[key]==="undefined") {vars[key]= decodeURIComponent(value);}
                else {vars[key]= [].concat(vars[key], decodeURIComponent(value));}
            });
        return vars;
    }
};
$(document).ready(function(){	


	var msg= {
			title:Url.get.searchBar,
			priceLow:0,
			priceHigh:99999999,
			ratingLow:0,
			ratingHigh:9999999,
			category:"",
		};
	socket.emit('search', msg);





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

	// socket.on('item info', function(msg){
	// 	$('#category').html(msg.category);
	// 	$('#rating').html(msg.rating);
	// 	$('#price').html("$"+ msg.price);
	// 	$('#title').html(msg.title);
	// 	$('#image').attr("src",msg.url);
	// 	//$("#comments").append("<li style='width:50%' class='list-group-item'>"+ "Comments"+'<span style="float:right">'+"Rating"+'</span>'+'</li>');
	// 	jQuery.each( msg.ratings, function( i, val ) {
 //  			$("#comments").append("<li style='width:50%' class='list-group-item'>"+ val.comment+'<span style="float:right">'+val.star+'</span>'+'</li>');
	// 	});

		
	// });
});
