const PORT = 3001;
const express = require("express");
const { createServer } = require("http");
const { io } = require("socket.io-client");

// Server
const app = express();
const http = createServer(app);
const client = io('http://localhost:3000');

const sleep = (ms)=> {
  var unixtime_ms = new Date().getTime();
  while(new Date().getTime() < unixtime_ms + ms) {}
}

var positionInQueue = 20
const document = '12345678'

client.on("connect", () => {
  console.log('👤 Client connection: ', client.id);
  
  do{
    client.emit('document', document)
    console.log('👤 Send document: ', document)

    sleep(3000)
  } while (positionInQueue > 0)
});

client.on("positionInQueue", (position) => {
  console.log(`👤 [${document}] Recive position in queue: ${position}`);
  positionInQueue = position
});

http.listen(PORT, () => {
  console.log(`👤 Client server listening on http://localhost:${PORT}`)  
})


