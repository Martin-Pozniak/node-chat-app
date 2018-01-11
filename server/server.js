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

/************************************
 * Globals
 ***********************************/
var publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

/********************************************************************************
 * Sets up 'app' as an express webserver
 *******************************************************************************/
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log("New User Connected");

    /*****************************************
    * Greet the individual user on connection
    *****************************************/
    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app!'));

    /*****************************************
    * Broadcast to chatroom that a new user has joined
    *****************************************/
    socket.broadcast.emit("newMessage", generateMessage('Admin',"New user joined!"));

    /*****************************************
    * Handle the create message event from client
    *****************************************/
    socket.on('createMessage', (newMessage,callback) => {
        console.log("Creating New Message: ", newMessage);
        io.emit('newMessage', generateMessage( newMessage.from, newMessage.text ));
        callback();
    });

    /*****************************************
    * Handle the create message event from client
    *****************************************/
    socket.on('createLocationMessage',(coords) => {
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude))
    });
    /*****************************************
    * Handle On Disconnect Event
    *****************************************/
    socket.on('disconnect', () => {
        console.log("User disconnected");
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