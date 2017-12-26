/*******************************
 * Desc: Client Side Java Script 
 ******************************/
var socket = io();

/*****************************************
* Handle the connect event
*****************************************/
socket.on('connect',function() {
    console.log("connected to server");
});
/*****************************************
* Handle the disconnect event
*****************************************/
socket.on('disconnect',function() {
    console.log("Disconnected from server")
});
/*****************************************
* handle the new message event
*****************************************/
socket.on('newMessage', function(message) {
    console.log("Received New Message: ",message);
});
/*****************************************
* Handle the new user joined event
*****************************************/
socket.on('newUserJoined',function() {
    console.log("New User Joined The Chat Room");
});
/*****************************************
* Handle the welcome message event
*****************************************/
socket.on('welcomeMessage', (message) => {
    console.log(message.text + ' @ '+ message.createdAt);
});