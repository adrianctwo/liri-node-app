require("dotenv").config();

// API Keys
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
// NPM package
var axios = require("axios");
var moment = require("moment");

// Grabbing user input in array[3]
var fs = require("fs");
var query =process.argv[3];

// Checking for keys
var option = process.argv[2];
console.log(option);

