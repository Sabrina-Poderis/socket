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


const randomDelay = (min=1000, max=5000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

server.on("connection", (socket) => {
  var positionInQueue = 10;
  console.log("🧦 Client connect");

  socket.on("documentPatient", (documentPatient) => {
    if(positionInQueue >= 0){
      setInterval(() => {
        if(positionInQueue >= 0){
          console.log(`🧦 [${documentPatient}]: Posição ${positionInQueue}`);
          socket.emit('positionInQueue', positionInQueue);
          positionInQueue--
        }
      }, randomDelay(1000, 3000));
    }
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
