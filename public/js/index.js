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
* Event Acknowledgements
*****************************************/
// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function() {
//     console.log("Got Ack!");
// });

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
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

/*****************************************
* handle the message submit button event
*****************************************/
$('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {

    });
});