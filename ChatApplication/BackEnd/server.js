const express = require('express');
const app = express();

const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('./public'));

const users = new Map();

io.on('connection', (socket) => {

    console.log('Connection Created Successfully');


    // Username
    socket.on('username', (username) => {

        users.set(socket.id, username);

        console.log(
            'Connected Users:',
            Array.from(users.values())
        );

        io.emit('userCount', users.size);

        io.emit(
            'onlineUsers',
            Array.from(users.values())
        );

    });


    // Chat Message
    socket.on('chat-message', (msg) => {

        const currentUser = users.get(socket.id);

        console.log(`${currentUser} :`, msg);

        const data = {

            username: currentUser,

            msg: msg,

            time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })

        };

        io.emit('userMessage', data);

    });


    // User Disconnect
    socket.on('disconnect', () => {

        const username = users.get(socket.id);

        console.log(
            'Disconnected User:',
            username
        );

        users.delete(socket.id);

        console.log(
            'Connected Users:',
            Array.from(users.values())
        );

        io.emit('userCount', users.size);

        io.emit(
            'onlineUsers',
            Array.from(users.values())
        );

    });

});


server.listen(3000, () => {
    console.log(
        'Server is Listening on http://localhost:3000'
    );
});