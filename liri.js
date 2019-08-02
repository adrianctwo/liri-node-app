require("dotenv").config();

// API Keys
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

// NPM package
var axios = require("axios");
var moment = require("moment");
moment().format();

// Reading random.txt file
var fs = require("fs");

// Checking for which command user wants to use
var command = process.argv[2];
console.log(command);

// Grabbing user input for to use in the command they choose in array[2]
var input = process.argv[3];

// Initialize Spotify client
var spotify = new Spotify(keys.spotify);

switch (command) {
    case "concert-this":
        concertThis(input);
        break;
    case "spotify-this-song":
        spotifySong(input);
        break;
    case "movie-this":
        movieThis(input);
        break;
    case "do-what-it-says":
        doThis(input);
        break;
    default:
        // Using fs to read random.txt
        fs.readFile("random.txt", "utf8", function (error, data) {
            // If there is an error
            if (error) {
                return console.log(error);
            }
            // Retrieve content and parsing string
            var data = data.split(",");
            var thatWay = data[1];
            // Calling the function of spotifyCall
            spotifyCall(thatWay);
        });
}

