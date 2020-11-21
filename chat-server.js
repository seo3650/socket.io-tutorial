const express = require("express");
const app = express();
const server = require("http").createServer(app);
const portNo = 3001;
server.listen(portNo, () => {
  console.log("Server Listen: ", "http://localhost: " + portNo);
});

const socketio = require("socket.io");
const io = socketio.listen(server);

// TODO 1: Server socket setting
