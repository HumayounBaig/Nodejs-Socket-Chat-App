const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();
const SocketIOFile = require('socket.io-file');
const http = require('http');
const httpServer = http.Server(app);

require("google-closure-library");
goog.require('goog.crypt.base64');
var fs = require("fs");
app.use(express.static('public'));

const server = app.listen(4000, ()=> console.log("Listening at http://localhost:4000"));
const io = socket(server);

io.on('connection', socket =>{
    console.log("Connected on Socket with ID: "+socket.id);
    socket.on('chat-message', function(data){
        console.log(data)
        io.sockets.emit('chat-message',data);
    })
    socket.on('typing', username => {
        console.log(username);
        socket.broadcast.emit('typing', username);
    })
     socket.on('image', function(info) {
        console.log(info);

        socket.emit('image', { username: info.username , buffer: info.buffer});
    })

})
