var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
    text: "Hello, welcome to this chat test",
    author: "Admin"
}];

var users = new Map();

app.use(express.static('../public'));

app.get('/hello', function (req, res) {
    res.status(200).send("Hello World");
});

io.on('connection', function (socket) {
    console.log('Un cliente se ha conectado');

    socket.emit('messages', messages);

    socket.on('new-message', function (data) {
        messages.push(data);
        users.set(socket.id, data);
        io.sockets.emit('messages', messages);
    })
});

server.listen(8080, function () {
    console.log('Servidor corriendo en http://localhost:8080');
});