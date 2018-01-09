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
// }, function() { //THis callback is the ack
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
* handle the new location message event
*****************************************/
socket.on('newLocationMessage', function(message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
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

/*****************************************
* handle the send location button click
*****************************************/
var locButton = $('#send-location');
locButton.on('click', function() {
    if (!navigator.geolocation) return alert("No Geolocation Available!");
    navigator.geolocation.getCurrentPosition( function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert("Unable To Fetch Location.");
    });
});