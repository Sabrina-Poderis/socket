const app = require('express')()
const http = require('http').createServer(app);
const io = require("socket.io")(http);

app.get('/', (req,res) => {
  res.sendFile(`${__dirname}/index.html`)
})

io.on("connection", (socket) => {
  console.log('👤 Client connection: ', socket)
});

http.listen(3000, () => {
  console.log('🧦 Socket server listening on http://localhost:3000')  
})
