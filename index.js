var fs = require('fs');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require("express");
var mkdirp = require('mkdirp');



app.get('/', function(req, res){
  res.sendFile(__dirname + '/static/index.html');
});

app.use('/external/', express.static(__dirname + "/static/"));
io.on('connection', function(socket){
  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
    

io.on('connection', function(socket){
 
  socket.on('disconnect', function(){

  });
});
    

io.on('connection', function(socket){
  socket.on('move', function(msg){
    var coords;
    console.log(msg);
    var ret = msg.split(",");
    io.emit('new-player', msg);
  });
});

io.on('connection', function(socket){
  socket.on('new-join', function(message) {
	console.log("user join: " + message);


	console.log("telling user " + message + ": " +  x + "," + y + "," + c);
	this.emit("info", x + "," + y + "," + c);

	var tdir = __dirname + "/data/" + message + "/";
	var x,y,c;
	fs.readFile(tdir + "x", 'utf8', function (err,data) {
		x = data;
		console.log(x);
	});
	fs.readFile(tdir + "y", 'utf8', function (err,data) {
		y = data;
	});
	fs.readFile(tdir + "color", 'utf8', function (err,data) {
		c = data;
	});
	});
});
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max-min + 1)) + min;
}

io.on('connection', function(socket){
  socket.on('new-user', function(message) {
	var c = new Date();
	var ms = c.getTime();
	mkdirp(__dirname + "/data/" + ms, function(err) { 
	});
	var tdir = __dirname + "/data/" + ms + "/";
	fs.writeFile(tdir + "color",'#'+(Math.random()*0xFFFFFF<<0).toString(16));
	fs.writeFile(tdir + "x", Math.round(getRandomInt(-1000,1000)));
	fs.writeFile(tdir + "y", Math.round(getRandomInt(-1000,1000)));
	fs.writeFile(tdir + "claimed", "0");
	this.emit("new-info", ms);
	console.log("user join (NEW): " + ms);
	});
});
