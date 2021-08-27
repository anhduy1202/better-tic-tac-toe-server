const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const {getUserList, get_Current_User, user_Disconnect, join_User, playByTurn } = require("./dummyuser");
//Set static folder
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = require("socket.io")(httpServer, {
     cors:
     origin: "http://localhost:8080",
     methods: ["GET","POST"]
                                }
});
const PORT = process.env.PORT || 8000;



//Run when client connect
//Run when client connect
io.on('connection', socket => {
    console.log(`Connected: ${socket.id}`);

    socket.on('join', ({ username, rooms }) => {

        //create user


        const p_user = join_User(socket.id, username, rooms);

        socket.join(p_user.room);
        io.to(p_user.room).emit('updateUsersList', getUserList(p_user.room));
        socket.broadcast.to(p_user.room).emit("message",
            {
                join: `${p_user.username} join the room `,
            });

        //Get number of users in room
        let clientNumber = io.sockets.adapter.rooms.get(rooms);

        //Max is two
        if (clientNumber.size > 2) {

            console.log('room is full');

            socket.emit("room_join_full", {
                error: "Room is full please choose another room to play!",

            }
            );
            socket.leave(p_user.room);
            console.log(clientNumber.size);
        }
        
        



    });
    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}`);
        const p_user = user_Disconnect(socket.id);

        if (p_user) {
            io.to(p_user.room).emit('updateUsersList', getUserList(p_user.room));

            io.to(p_user.room).emit("left",
                ` ${p_user.username} has left the room, game room will be terminated`);
        }
    })

    socket.on('click_square', ({ username, rooms, board }) => {
    })



});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
