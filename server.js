const express = require('express')
const app = express()
const http = require('http')
const socketIO = require('socket.io')
const PORT = 3000;

app.use(express.static(__dirname));

let server = http.Server(app);
server.listen(PORT);

console.log(`Listening on port ${PORT}`);

let io = socketIO(server);

io.on('connection', function (socket) {

    socket.on('make-offer', function (data) {
        socket.broadcast.emit('offer-made', {
            offer: data.offer,
            socket: socket.id
        });
    });

    socket.on('make-answer', function (data) {
        socket.to(data.to).emit('answer-made', {
            socket: socket.id,
            answer: data.answer
        });
    });

});
