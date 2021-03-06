const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
// const path = require('path');

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users.js');

const router = require("./router");

const PORT = process.env.PORT || 5000;

const app = express();

const server = http.createServer(app);
const io = socketio(server);

server.listen(PORT, () => console.log(`Server has been started! (Port ${PORT})`));

// app.use(function (request, response) {
//     response.sendFile(path.resolve(__dirname + "/../client_side/src/index.html"));
//   });
app.use(cors());
app.use(router);

io.on('connection', socket => {
    console.log(`new listener = ${socket}`);
    socket.on('join', ({name="", room=""}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room});

        if(error) return callback(error);

        socket.emit('message', {user:'admin', text:`${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name} has joined room!`});

        socket.join(user.room);

        io.to(user.room).emit('roomData', {room:user.room, users:getUsersInRoom(user.room)});
        
        callback();
    });

    socket.on('sendMessage', (message, callback) =>{
        const user = getUser(socket.id);
        if(user){
            io.to(user.room).emit('message', {user:user.name, text:message});
            io.to(user.room).emit('roomData', {room:user.room, users:getUsersInRoom(user.room)});
        }

        callback();
    });

    socket.on('disconnect', () => {
        // console.log('user have left');
        const user = removeUser(socket.id);
        if(user){
            // io.to(user.room).emit('message', {user:'admin', text:`${user.name}, left room ${user.room}`});
            socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name} has left room!`});
        }
    });
});