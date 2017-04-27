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
	
	
	socket.emit('get auction', Url.get.id);
	console.log('get auction');
		
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

	});
	$('#bidButton').click(function(){
		var msg= {
			username:localStorage.getItem("username"),
			sessionString:localStorage.getItem("sessionString"),
			id:Url.get.id,
			title:$('#title').html(),
			price:$('#price').html(),
			seller:$('#seller').html()
		};
		//socket.emit('bid item', msg); //fix later bid
		console.log($('#currentPrice').html());
		var a=parseInt($('#currentPrice').html());
		$('#currentPrice').html(a+2);
		// $('#currentprice').html($('#currentprice').html()+5);
	});

	socket.on('button was clicked', function(msg){
	});
	socket.on('sale successful', function(msg){
		alert("Sale was successful");
		$("#quantity").html($("#quantity").html()-1);
	});

	socket.on('auction info', function(msg){
		console.log("got info");
		$('#category2').html(msg.category);
		
		if (typeof msg.current_bid !== 'undefined') {
			$('#currentPrice').html(msg.current_bid.amount);
		}
		else{
			$('#currentPrice').html('1');
		}
		$('#title').html(msg.item_name);
		$('#image').attr("src",msg.URL);
		$('#seller').html(msg.seller);
		$('#closingTime').html((new Date(msg.finish_time)).toLocaleString());

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


