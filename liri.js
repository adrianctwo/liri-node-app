require("dotenv").config();

// API Keys
var keys = require("./keys.js");
var Spotify = require('node-spotify-api')

// Initialize Spotify client
var spotify = new Spotify(keys.spotify);

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
    // This is a default case if there is no command and just running the liri.js
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
            spotifySong(thatWay);
        });
}

// // Concert function
// function concertThis(input) {
//     // Getting api response from bandsintown with boot camp api
//     axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(function (response) {
//         var concertInfo =
//         "Artist: " + artist + "\nVenue: " + response.data[0].venue.name + "\nLocation: " + response.data[0].venue.country + "\nDate: " + response.data[0].datatime + "\nRock on dude!"
//         console.log(concertInfo);
//     })
//         // catching for errors
//         .catch(function (error) {
//             console.log(error);
//         });
// }

function concertThis(input) {
    // // This line is just to help us debug against the actual URL.
    // Creating a request with axios to the queryUrl
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(function (response) {
            console.log("_Upcoming Events_");
            console.log("Artist: " + input + "\nVenue: " + response.data[0].venue.name + "\nLocation: " + response.data[0].venue.country + "\nDate: " + response.data[0].datatime + "\nRock on dude!");
        }).catch(function(err){
            console.log(err);
        });
}

// Music function
function spotifySong(input) {
    // searching for the sign if there is no input
    if (!input) {
        input = "The Sign";
    }
    // calling for spotify api with the npm spotify api
    spotify.search({ type: 'track', query: input }).then(function (response) {
        // getting the 1st 5 results
        for (var i = 0; i < 5; i++) {
            var spotifyResults =
                "\nArtist(s): " + response.tracks.items[i].artists[0].name +
                "\nSong Name: " + response.tracks.items[i].name +
                "\nAlbum Name: " + response.tracks.items[i].album.name +
                "\nPreview Link: " + response.tracks.items[i].preview_url;
            console.log(spotifyResults);
        }
        // checking for error
    }).catch(function (err) {
        console.log(err);
    });
}

// Find movie function
function movieThis(input) {
    if (!input) {
        input = "Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            if (!input) {
                input = "Mr. Nobody";
            }
            console.log("\n_Movie Info_" + "\nTitle: " + response.data.Title + "\nRelease Year: " + response.data.Year + "\nRating: " + response.data.Rated + "\nRelease Country: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n" + "\n Love this one!")
        }
    );
}