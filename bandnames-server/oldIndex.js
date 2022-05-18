const express = require('express');
const app = express();
const http = require('http');
const { SocketAddress } = require('net');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use( express.static(__dirname + '/public'));

/*app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});*/

io.on('connection', (socket) => {
  console.log('a user connected ', socket.id );

  socket.emit('Bienvenido', socket.id)

  socket.on('mensaje', (data) => console.log(data))

  socket.on("mensaje-to-server", (datos) => {
    console.log(datos)

    io.emit("Mensaje-del-server", datos) //<== se utilizó io para que actualice todos los clientes, socket solo lo haría con uno
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});