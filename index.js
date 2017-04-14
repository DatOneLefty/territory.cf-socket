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
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
    

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
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
	this.emit("info", "0,0,0e0e0e");
	});
});

io.on('connection', function(socket){
  socket.on('new-user', function(message) {
	var c = new Date();
	var ms = c.getTime();
	mkdirp(__dirname + "/" + ms, function(err) { 
	});
	this.emit("new-info", ms);
	});
});

