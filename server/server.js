/************************************
 * File: server.js
 * Desc: The heart of the chat app. it takes care of setting up the app and declaring the public static directory
 ***********************************/

/************************************
 * Requires
 ***********************************/
const path=require('path');
const express = require('express');

/************************************
 * Globals
 ***********************************/
var publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

/********************************************************************************
 * Sets up 'app' as an express webserver
 *******************************************************************************/
var app = express();

/********************************************************************************
 * Express Middleware used to serve the public directory as the static directory
 *******************************************************************************/
app.use(express.static(publicPath));

/********************************************************************************
 * Starts the webserver listening on local host 3000 or heroku if its available
 *******************************************************************************/
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});