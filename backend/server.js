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
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);

const io = new Server(server, {cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },});


io.on('connection', (socket) => {
	console.log(`User connected: ${socket.id}`);
	socket.on('create-room', (user) => {
		socket.join(user.roomId);
		console.log(`Joined Room ${user.roomId}`);
	});
	socket.on('join-room', (user) => {
		socket.join(user.roomId);
		console.log('joining')
		socket.emit('user-connected');
	});
	socket.on('disconnect', () => {
		console.log(`User Disconnected: ${socket.id}`)
	});
})


server.listen(4000, () => {
	console.log('Listening on port 4000')
});
