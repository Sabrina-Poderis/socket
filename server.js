const SERVER_PORT = 3001;
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

// Server
const app = express();
const http = createServer(app);
const server = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

var positionInQueue = 10;

server.on("connection", (socket) => {
  console.log("🧦 Client connect");

  socket.on("document", (document) => {
    console.log("🧦 Document: ", document);

    positionInQueue--

    server.emit('positionInQueue', positionInQueue)
    console.log(`🧦 [${document}] Send position in queue: ${positionInQueue}`)
  });

  socket.on("connect_error", (error) => {
    console.log("🧦 Error: ", error);
  });

  socket.on("disconnect", (reason) => {
    console.log(`🧦 Disconnect ${socket.id} due to ${reason}`);
  });
});

http.listen(SERVER_PORT, () => {
  console.log(`🧦 Socket server listening on http://localhost:${SERVER_PORT}`)  
})
