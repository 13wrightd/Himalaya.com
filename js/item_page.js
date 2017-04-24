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
	
	socket.emit('get item', Url.get.id);
		
	$('#submitButton').click(function(){
		socket.emit('add user', msg);
	});


	socket.on('button was clicked', function(msg){
	});

	socket.on('item info', function(msg){
		$('#category').html(msg.category);
		$('#rating').html(msg.rating);
		$('#price').html("$"+ msg.price);
		$('#title').html(msg.title);
		$('#image').attr("src",msg.url);
		$("#comments").append("<li style='width:50%' class='list-group-item'>"+ "Comments"+'<span style="float:right">'+"Rating"+'</span>'+'</li>');
		jQuery.each( msg.ratings, function( i, val ) {
  			$("#comments").append("<li style='width:50%' class='list-group-item'>"+ val.comment+'<span style="float:right">'+val.star+'</span>'+'</li>');
		});

		
	});
});


