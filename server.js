const PORT = 3000;
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

// Server
const app = express();
const http = createServer(app);
const server = new Server(http);

var positionInQueue = 20;

server.on("connection", (client) => {
  console.log('🧦 Client connection: ', client.id)
});

server.on("document", (document) => {
  console.log('🧦 Recieve document: ', document)

  positionInQueue--

  server.emit('positionInQueue', positionInQueue)
  console.log(`🧦 [${document}] Send position in queue: ${positionInQueue}`)
});

http.listen(PORT, () => {
  console.log(`🧦 Socket server listening on http://localhost:${PORT}`)  
})
