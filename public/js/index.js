/*******************************
 * Desc: Client Side Java Script 
 ******************************/
var socket = io();

socket.on('connect',function() {
    console.log("connected to server");

    // socket.emit('createEmail',{
    //     to:'jen@example.com',
    //     text:'Hey. This is Andrew.'
    // });
    socket.emit("createMessage", {
        to: 'Martin',
        text:'Here\'s the message',
    });
});

socket.on('disconnect',function() {
    console.log("Disconnected from server")
});

socket.on('newMessage', function(message) {
    console.log("Client Received New Message: ",message);
});
// socket.on('newEmail',function(email) {
//     console.log("New Email:",email);
// });