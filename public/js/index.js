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
    var formattedTime = moment(message.createdAt).format('h:m:s a');

    // console.log("Received New Message: ",message);
    // var li = $('<li></li>');
    // var timestamp=$(`<span class='timestamp'>${formattedTime.format('h:m:s a')}</span>`)
    // li.text(`${message.from}: ${message.text}`);
    // $('#messages').append(li);
    // $('#messages').append(timestamp); 

    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text:message.text,
        from:message.from,
        timestamp:formattedTime
    });
    $('#messages').append(html);
});

/*****************************************
* handle the new location message event
*****************************************/
socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:m:s a');    
    // var li = $('<li></li>');
    // var timestamp=$(`<span class='timestamp'>${formattedTime.format('h:m:s a')}</span>`)    
    // var a = $('<a target="_blank">My Current Location</a>');
    // li.text(`${message.from}: `);
    // a.attr('href',message.url);
    // li.append(a);
    // $('#messages').append(li);  
    // $('#messages').append(timestamp);   

    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        text:message.text,
        from:message.from,
        timestamp:formattedTime,
        url:message.url
    });
    $('#messages').append(html);

});

/*****************************************
* handle the message submit button event
*****************************************/
$('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextbox = $('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        //inside of acknowledgement, we clear the val after success
        messageTextbox.val('');
    });
});

/*****************************************
* handle the send location button click
*****************************************/
var locButton = $('#send-location');
locButton.on('click', function() {

    locButton.attr('disabled','disabled');
    locButton.html('Sending Location...');
    if (!navigator.geolocation) return alert("No Geolocation Available!");
    
    navigator.geolocation.getCurrentPosition( function(position) {
        locButton.removeAttr('disabled');
        locButton.html('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert("Unable To Fetch Location.");
        locButton.removeAttr('disabled');
        locButton.html('Send Location');
    });
});