var express = require("express"); 
var app = express();
var server = require("http").createServer(app);

var io = require("socket.io")(server);
//setting the required variables

mems = []; //users array
memConnections = []; //connections array

server.listen(process.env.PORT || 2019);  // It will run on localhost:(any number)
console.log("ESCChat Is Up");

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html"); //links to html file CHANGE /index.html to you actually html file
	
});
	
io.sockets.on("connection", function(socket){
	//connection stuff
	memConnections.push(socket);
	console.log("Members connected: %s", memConnections.length);
	
	// disconnection stuff
	socket.on("disconnect", function(data){
		
		mems.splice(mems.indexOf(socket.username), 1); //accessing the array memers
		
		
	memConnections.splice(memConnections.indexOf(socket),1);
	console.log("Members disconnected: %s ", memConnections.length);
	});
	
	//send messages
	socket.on("send message", function(data){ 
		console.log(data);// shows what is typed in console
		io.sockets.emit("new message", {msg: data});
	});
});
