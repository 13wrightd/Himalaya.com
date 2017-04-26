'use strict';

var app = require('express')();
var http = require('http').Server(app);
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
//app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

// mongolabs (to look at database)
// username: cmpsc431wTeam2
// password: password314


// 1
var io = require('socket.io')(http);


// we wont need this anymore because we are using mySQL not mongoDB
////////////////////////////////////  
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin1:password314@ds137110.mlab.com:37110/himalaya');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error: '));
db.once('open', function(){
    console.log('Database connected.');
});

setTimeout(function(){
  console.log("called settimeout");
  //put stuff for querying if time is over limit
  schemas.auction.find({finish_time: {$lt: Date.now()}}, function(err,doc){
  //for all auctions:
    //check if current auction bid is equal to or over reserve price
    //if so, do 1-3 below
    //1. construct and send notification about finished notificationa about auction to all participants
    //2. put finished auction info into saleSchema
    //3. change boolean "finished" to true for auctionSchema
  //if it is not over reserve price, delete the auction from the database
  var i = doc.length;
  while(i<doc.length){
      if(doc[i].current_bid.amount>=reserve_price){
        var notificationMessage = {
          item_name: doc[i].item_name,
          auctionId: doc[i]._id,
          type: "auction",
          URL: doc[i].URL,
          seller: doc[i].seller,
          start_time: doc[i].start_time,
          finish_time: doc[i].finish_time,
          reserve_price: doc[i].reserve_price,
          ending_price: doc[i].current_bid.amount,
          buyer: doc[i].current_bid.username
          /*
          notifications:[
  {
    item_name: String,
    itemId: String,
    auctionId: String,
    type: String,
    URL: String,
    seller: String,
    start_time: Date,
    finish_time: Date,
    reserve_price: String,
    ending_price: String,
    buyer: String
  }
          */
        }
      }
      else{
        //delete auction
        doc[i].remove();
      }


      i++;
    /*
    item_name: String,
  category: String,
  URL: String,
  description: String,
  address:{
    street: String,
    city: String,
    state: String,
    zip: Number
  },
  seller: String,
  start_time: { type: Date, default: Date.now },
  finish_time: Date,
  reserve_price: Number,
  current_bid: {
    username: String,
    amount: Number
  },
  //array of bidders that are notified at end of auction
  bids:[
  {
    username: String,
    amount: Number
  }
  ]

    */
  }
});

  }, 10000000);//every 10 seconds

setTimeout(function(){
  console.log("called settimeout")
  //close all auctions at the end of the day by doing as follows:
  //for all auctions:
    //check if current auction bid is equal to or over reserve price
    //if so, do 1-3 below
    //1. construct and send notification about finished notificationa about auction to all participants
    //2. put finished auction info into saleSchema
    //3. change boolean "finished" to true for auctionSchema
  //if it is not over reserve price, delete the auction from the database


}, 1000*60*60*24);//every 24 hours
////////////////////////////////////



app.get('/', function (req, res) {
  res.sendFile(__dirname+ '/index.html');
  console.log('someone loaded homepage');
});
app.get('/pages/*', function (req, res) {
  res.sendFile(__dirname+ req.path);
});
app.get('/js/*', function (req, res) {
  res.sendFile(__dirname+ req.path);
});
app.get('/css/*', function (req, res) {
  res.sendFile(__dirname+ req.path);
});

app.get('/images/*', function (req, res) {
  res.sendFile(__dirname+ req.path);
});

// app.get('/images/still/*', function (req, res) {
//   res.sendFile(__dirname+ req.path);
// });



var schemas = require('./models/schemas.js');
var user = require('./models/oldUser.js');


var b = new schemas.saleItem({
 // seller: {
  //  type: mongoose.Schema.Types.ObjectId},
  title: 'pancake bunny',
  description: 'random description ',
  price: 50,
  category: 'clothes',
  quantity: 20,
  url: 'http://i1.kym-cdn.com/photos/images/original/000/007/445/pancake_bunny.jpg',
  address:{
    street: '3501 Sheramy Drive',
    city: 'Fairview',
    state: 'PA',
    zip: 16415
  },
  ratings:[
  {
    comment:'good item for the most part',
    star:4
  },
  {
    comment:'great product',
    star:5
  },
  {
    comment:'not worth it at all',
    star:1
  }
  ]
});
// b.save();

// var tempUser= new schemas.user(
// {
//   username:'zzzzz',
//   test:5,
//   test2:3
// })
// tempUser.save(function(error){
//         // if (error){
//         //     console.log('item was successfully added');
//         //   }
//         //   else{
//         //     console.log('item add failed');
//         //   }
//       });


io.on('connection', function(socket) {


  socket.on('disconnect', function() {
    console.log('someone left');
  });
  socket.on('get items', function() {
    
    item.find({} ,function (err, doc){
        if(err){
          console.log("error");
        }
        else{
          io.emit('item list', doc);
        }
        
    });
  });


  socket.on('add user', function(msg) {
    console.log(typeof msg.type);
    console.log(typeof msg.cardNum);
    console.log(typeof msg.month);
    console.log(typeof msg.date);
      var b = new schemas.user({
        username: msg.userName,
        name: msg.name,
        email: msg.email,
        password: msg.password,
        phone_numbers: [{number:msg.phoneNum}],
        
        gender: msg.gender,
        age: msg.age,
        addresses:[{
          street: msg.street,
          city: msg.city,
          state: msg.state,
          zip: msg.zip
        }],
        
        credit_cards:[{
          cardtype: msg.type,
          number: msg.cardNum,
          month: msg.month,
          date: msg.date
        }],
        is_individual: true,
      });
      b.save(function(error){
        if(error){
          console.log(error.message);
        }
      });
      console.log('saved');




  });



   socket.on('authenticate', function(msg) {
    console.log(msg.username);
      schemas.user.findOne({username:msg.username},function(err, doc){
        console.log('got a user');
        if(doc.password == msg.password){
          var sessionString=generateID();
          doc.session_string=sessionString;

          var timeout = Date.now()+1000*60*5;
          //timeout.setMinutes(timeout.getMinutes() + 5);

          doc.session_date=timeout;
          doc.save();

          console.log("sending authentication data");
          io.emit('authentication data', sessionString);

        }

      });
   });



   socket.on('test session', function(msg) {
      console.log("is in session?");
      isInSession(msg.username, msg.sessionString, function(res){
        if(res==true){
          console.log('success, in session')

        }
        else{
          console.log('not in session');
        }

        });
      console.log("zzzzzz");
   });

   socket.on('post auction', function(msg) {
      console.log("is in session?");
      isInSession(msg.username, msg.sessionString, function(res){
        if(res==true){
          console.log('success, in session');
          var auctionToPost =  new schemas.auction({
          item_name: msg.itemName,
          category: msg.itemCategory,
          URL: msg.itemPictureURL,
          description: msg.description,
          address:{
            state:msg.itemLocation
          },
          seller: msg.username,
          finish_time: new Date(Date.now()+60*60*10*1000),//auction ends 10 hours from beginning
          reserve_price: msg.reservePrice
          });
          console.log("saved auction");
          auctionToPost.save();
        }
      });
    });

          

   socket.on('buy item', function(msg) {
      console.log("is in session?");
      isInSession(msg.username, msg.sessionString, function(res){
        if(res==true){
           
          schemas.saleItem.findOne({"_id": msg.id},function(err, doc){
             if(doc.quantity>0){
              console.log("quantity is over 0");
              doc.quantity=doc.quantity-1;
              doc.save();
              var saleToSave= new schemas.sale({
                type: 'sale',// sale or auction
                item_name: msg.title,
                seller: msg.seller,
                username: msg.username,
                price: msg.price,
                amount: 1,
                itemId: msg.id
              });
              saleToSave.save();
              io.emit("sale successful");
              console.log("order registered");
             }
          });
        }
        // else{
        //   console.log('not in session');
        // }
      });
   });
  


   socket.on('add comment', function(msg){
    var newComment={
      comment:msg.comment,
      star:parseInt(msg.rating)
    };
    schemas.saleItem.findByIdAndUpdate(msg.id,{$push: {"ratings": newComment}},function(err, model) {
        console.log(err);
    });

      // comment:$("#itemReviewComment").val(),
      // rating:$("itemReviewRating").val(),
      // id:Url.get.id
   });

   socket.on('get item', function(msg) {
    schemas.saleItem.findOne({"_id": msg},function(err, doc){
      io.emit('item info', doc);
    });
   });
   socket.on('search', function(msg){
    console.log(msg);
      schemas.saleItem.find({
        $and:[
          {$or:[
            {"title": new RegExp(msg.title,'i')},
            {"description": new RegExp(msg.title,'i')}
          ]},
          {$and:[
            {"price": {$gte: msg.priceLow}},
            {"price": {$lte: msg.priceHigh}}
          ]},
          {"category": new RegExp(msg.category,'i')}

        ]
      },function(err, doc){
        io.emit('search results',doc);
      });

   });
  socket.on('button clicked', function(msg) {

    io.emit('button was clicked', msg);
      var a = new item({
          itemID: msg.itemID,
          description: msg.description,
          URL: msg.URL,
          name: msg.name,
          numberOfRatings: msg.numberOfRatings,
          categoryID: msg.categoryID,
          rating: msg.rating
          
      });
      console.log(a);

      a.save(function(error){
        // if (error){
        //     console.log('item was successfully added');
        //   }
        //   else{
        //     console.log('item add failed');
        //   }
      });
  });
 });





var server = http.listen(app.get('port') , function () {
    console.log("Express server listening at %s:%d ", app.get('ip'),app.get('port'));
});

function generateID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function isInSession(user, sessionString, callback){
  var currentTime = new Date(Date.now());
  var inSession=false;
  var test=schemas.user.findOne({username:user},function(err, doc){
    if(sessionString=doc.session_string){
      console.log(doc.session_date);
      console.log(currentTime);
      var tempTime=new Date(doc.session_date);
      console.log('times');
      console.log(tempTime);
      console.log(currentTime);
      if(currentTime<tempTime){
          console.log("in session");
          currentTime=currentTime.getTime()+5*1000*60;
          doc.session_date=new Date(currentTime);
          doc.save();
          console.log('returning true');
          inSession=true;
          return callback(true);
      }
      return callback(false);
    }

    console.log('sup1');
    return callback(false);
  });
 // console.log(test);
  console.log('sup2');
};


//javascript class example
/*
function player(xStart, yStart, socketId){
  
  if(xStart){
   this.x=xStart;
  }
  else{
    this.x=width/2;
  }
  if(yStart){
    this.y=yStart;  
  }
  else{
    this.y=height/2;
  }
  this.xOld=this.x;
  this.color= getRandomColor();
  this.socketId=socketId;//guid();
  this.speed=1;

  this.yOld=this.y;
  this.keys=[];
}

player.prototype.update = function(){
  // w = 38
  // a = 65
  // s = 83
  // d = 68
  if('87' in this.keys){  //w up
      this.y-=this.speed;
  }
  if('83' in this.keys){  //s down
      this.y+=this.speed;
  }
  if('65' in this.keys){  //a left
      this.x-=this.speed;
  }
  if('68' in this.keys){  //d right
      this.x+=this.speed;
  }

  // if(this.keys.length>0){
  //   io.emit('player position', this);
  // }
}

function playerList(){
  this.players=new Array;
}
playerList.prototype.add = function(socketId){
  this.players.push(new player(200,200, socketId));
}


playerList.prototype.removeBySocketId = function(socketId){
  for(var i = 0; i<this.players.length;i++){

    if (this.players[i].socketId==socketId){
      this.players.splice(i,1);
      break
    }
  }
}

playerList.prototype.changeKeysBySocketId = function(socketId, keys){
  for(var i = 0; i<this.players.length;i++){
    if (this.players[i].socketId==socketId){
      this.players[i].keys=keys;
    }
  }
}

playerList.prototype.update = function(){
  for(var i = 0; i<this.players.length;i++){
    this.players[i].update();
  }
}
var players= new playerList();
*/




// // (10) sale report
// var salesDate = new Date(Date.now()-1000*60*30); 
// //30 minutes

// var currentDate = new Date(Date.now());

// //should return all sales from up to 30 minutes ago
// var recentSales = sale.find({"sale_time": {$gt: salesDate}});

// //should return aggregation of auctions from up to 30 minutes ago

// var recentAuctionAggregate = auction.aggregate({$match: {current_bid.bid_date:{$gt: salesDate}}}, {$project: {_id: 0, current_bid.amount: 1}},{$group: {30_min_bid_num: {$sum: 1}, combined_bid_amounts: {$sum: "$current_bid.amount"}}})
