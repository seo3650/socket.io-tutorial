const express = require("express");
const app = express();
const server = require("http").createServer(app);
const portNo = 3001;
server.listen(portNo, () => {
  console.log("Server Listen: ", "http://localhost: " + portNo);
});

const socketio = require("socket.io");
const io = socketio.listen(server);

io.on("connection", (socket) => {
  console.log("Login: ", socket.client.id);

  // Recieve message
  socket.on("chat-msg", (msg) => {
    console.log("message: ", msg);
    io.emit("chat-msg", msg);
  });
});
