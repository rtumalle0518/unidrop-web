// const express = require("express");
// const path = require("path");

// const app = express();
// const server = require("http").createServer(app); //creates server on PC

// const io = require("socket.io")(server);

// app.use(express.static(path.join(__dirname + "/public")));

// io.on("connection", function (socket) {
// 	socket.on("sender-join", function (data) {
// 		socket.join(data.uid);
// 	});
// 	socket.on("receiver-join", function (data) {
// 		socket.join(data.uid);
// 		socket.in(data.sender_uid).emit("init", data.uid);
// 	});
// 	socket.on("file-meta", function (data) {
// 		socket.in(data.uid).emit("fs-meta", data.metadata);
// 	});
// 	socket.on("fs-start", function (data) {
// 		socket.in(data.uid).emit("fs-share", {});
// 	});
// 	socket.on("file-raw", function (data) {
// 		socket.in(data.uid).emit("fs-share", data.buffer);
// 	});
// });
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
	console.log('There is a connection')
})


server.listen(5000, () => {
	console.log('Listening on port 5000')
});
