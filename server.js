const SERVER_PORT = 6666;
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

// Server
const app = express();
const http = createServer(app);
const server = new Server(http);

var positionInQueue = 5;

server.on("connection", (client) => {
  console.log("🧦 Client connect");

  client.on("connect_error", (error) => {
    console.log(error);
  });

  client.on("disconnect", (reason) => {
    console.log(`🧦 Disconnect ${client.id} due to ${reason}`);
  });

  client.on("document", (document) => {
    console.log('🧦 Recieve document: ', document)

    positionInQueue--

    server.to(client.id).emit('positionInQueue', positionInQueue)
    console.log(`🧦 [${document}] Send position in queue: ${positionInQueue}`)
  });

});

http.listen(SERVER_PORT, () => {
  console.log(`🧦 Socket server listening on http://localhost:${SERVER_PORT}`)  
})


// server.on("connection", (client) => {
//   console.log('🧦 Client connection (parabens): ', client.id)

//   server.to(client.id).emit('ummmm', 'ummmm')

//   client.on('forceDisconnect', function(){
//     client.disconnect();
//   });

//   client.on('forceConnect', function(){
//     client.connect();
//   });
  
//   client.on("disconnect", (reason) => {
//     console.log(`🧦 Disconnect ${client.id} due to ${reason}`);
//   });
// });