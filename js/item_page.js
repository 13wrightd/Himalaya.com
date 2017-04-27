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
		
	$('#submitReview').click(function(){
		var msg= {
			comment:$("#itemReviewComment").val(),
			rating:$("#itemReviewRating").val(),
			id:Url.get.id
		};
		socket.emit('add comment', msg);
		setTimeout(function(){
			socket.emit('get item', Url.get.id);
		},500);
	$('#wishButton').click(function(){
		var msg= {
			
		}
	});

	});
	$('#buyButton').click(function(){
		var msg= {
			username:localStorage.getItem("username"),
			sessionString:localStorage.getItem("sessionString"),
			id:Url.get.id,
			title:$('#title').html(),
			price:$('#price').html(),
			seller:$('#seller').html()
		};
		socket.emit('buy item', msg);
	});


	socket.on('button was clicked', function(msg){
	});
	socket.on('sale successful', function(msg){
		alert("Sale was successful");
		$("#quantity").html($("#quantity").html()-1);
	});

	socket.on('item info', function(msg){
		$('#category2').html(msg.category);
		
		$('#price').html(msg.price);
		$('#title').html(msg.title);
		$('#image').attr("src",msg.url);
		$('#seller').html(msg.seller);
		$('#quantity').html(msg.quantity);

		$('#description').html(msg.description);
		var count=0;
		var rating=0;
		$("#comments").empty();
		//$("#comments").append("<li style='width:50%' class='list-group-item'>"+ "Comments"+'<span style="float:right">'+"Rating"+'</span>'+'</li>');
		jQuery.each( msg.ratings, function( i, val ) {
			console.log("s"+val.star);
			rating+=val.star;
			console.log('sum '+rating);
			count+=1;
  			$("#comments").append("<li style='width:50%' class='list-group-item'>"+ val.comment+'<span style="float:right">'+val.star+'</span>'+'</li>');
		});
		console.log(rating);
		if(count>0){
			rating=rating/count;
		}
		else{
			rating=0;
		}
		$('#rating').html(rating.toFixed(2));
		console.log(count);
		

		
	});
});


