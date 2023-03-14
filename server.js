const app = require('express')()
const http = require('http').createServer(app);

const io = require('socket.io')(http)

http.listen(3000, () => {
  console.log('🧦 Socket server listening on port 3000')  
})