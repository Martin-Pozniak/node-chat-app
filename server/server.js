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

    socket.on('disconnect', () => {
        console.log("User disconnected");
    });

    // socket.on('createEmail', (newEmail) => {
    //     console.log("createEmail",newEmail);
    // });

    // socket.emit('newEmail',{
    //     from: 'cap.pozniak@gmail.com',
    //     text: 'Hey, what\'s going on'
    // });
    socket.emit("newMessage", {
        createdAt:'11:51',
        from:`Client Name`,
        text:`Client Message`
    });
    socket.on('createMessage', (newMessage) => {
        console.log("Creating New Message For Cleint: ", newMessage);
        
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