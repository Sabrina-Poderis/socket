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

server.on("connection", (socket) => {
  console.log('🧦 Client connection: ', socket)
});

http.listen(3000, () => {
  console.log('🧦 Socket server listening on http://localhost:3000')  
})
