// Imports
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

// Server
const app = express();
const http = createServer(app);
const server = new Server(http);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

server.on("connection", (client) => {
  console.log('🧦 Client connection: ', client.id)

  client.on("document", (document) => {
    console.log('🧦 Recieve document: ', document)
    let positionInQueue = 10;
    let delayQueue = 3000;

    setInterval(() => {
      for(let count = positionInQueue; count >= 0; count--){
        server.emit('positionInQueue', count--)
      }
    }, delayQueue)
  });
});

http.listen(3000, () => {
  console.log('🧦 Socket server listening on http://localhost:3000')  
})
