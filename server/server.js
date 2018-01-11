/************************************
 * File: server.js
 * Desc: The heart of the chat app. it takes care of setting up the app and declaring the public static directory
 ***********************************/

/************************************
 * Requires
 ***********************************/
const path=require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users.js');
/************************************
 * Globals
 ***********************************/
var publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var users = new Users();

/********************************************************************************
 * Sets up 'app' as an express webserver
 *******************************************************************************/
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log("New User Connected");

    /*****************************************
    * Handle the create message event from client
    *****************************************/
    socket.on('createMessage', (newMessage,callback) => {
        
        user=users.getUser(socket.id);
        
        if(user && isRealString(newMessage.text)) {
            io.to(user.room).emit('newMessage', generateMessage( user.name, newMessage.text ));
        }
        callback();
    });

    /*****************************************
    * Handle the create message event from client
    *****************************************/
    socket.on('createLocationMessage',(coords) => {
        user=users.getUser(socket.id);
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude, coords.longitude))
    });

    /*****************************************
    * Handle On Join
    *****************************************/
    socket.on('join', (params, callback) => {
        
        if ( !isRealString(params.name) || !isRealString(params.room) ){
            return callback('Name Or Room Name is Incorrect'); //validation code, if this execute nothing happens
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        /*****************************************
        * Greet the individual user on connection
        *****************************************/
        socket.emit('newMessage', generateMessage('Admin',`Welcome to the chat app! You are in room "${params.room}"`));

        /*****************************************
        * Broadcast to a specific chatroom that a new user has joined
        *****************************************/
        socket.broadcast.to(params.room).emit("newMessage", generateMessage('Admin',`${params.name} has joined the chat!`));

        callback();

    });
    /*****************************************
    * Handle On Disconnect Event
    *****************************************/
    socket.on('disconnect', () => {

        console.log("User disconnected");

        var user = users.removeUser(socket.id);

        if ( user ) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage("Admin",`${user.name} has left the chat...`));
        }

    });
    
});

/********************************************************************************
 * Express Middleware used to serve the public directory as the static directory
 *******************************************************************************/
app.use(express.static(publicPath));

/********************************************************************************
 * Starts the webserver listening on local host 3000 or heroku if its available
 *******************************************************************************/
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});