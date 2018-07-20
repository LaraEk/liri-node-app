
var fs = require("fs");
// this one reads/writes files!
var request = require("request");
// this one makes requests!


var keys = require('./keys.js');
 var twitter = require('twitter');
var spotify = require('node-spotify-api');

var spotify = new spotify(keys.spotify);

var givenArg = process.argv[2];

function isitworking() {
    console.log(givenArg);
};

isitworking();

 switch(givenArg) {
     case "my-tweets": myTweets();
     break;
     case "spotify-this-song": spotifyThisSong();
     break;
     case "movie-this": movieThis();
     break;
     case "do-what-it-says": doWhatItSays();
     break;
     default: console.log("\r\n" + "Please type one of the commands below.  If the song or movie title you're searching more is more than one word long, please enclose it in quotation marks." + "\r\n" +
    "1. node liri.js my-tweets 'any twitter handle' " + "\r\n" +
    "2. node liri.js spotify-this-song 'any song title' " + "\r\n" +
    "3. node liri.js movie-this 'any movie title' " + "\r\n" +
    "4. node liri.js do-what-it-says");
 }


function myTweets() {
    console.log("is working; WIP");
};

function spotifyThisSong() {
    console.log("~ have some music ~");
    var songTitle = process.argv[3];
    console.log(songTitle);
    if (!songTitle) {
        console.log("No song has been entered?  That's okay, I've got a great song for you!");
        songTitle = "Mr Blue Sky";
    }
    params = songTitle;
    spotify.search({type: "track", query: params}, function(err, data) {
        if (!err) {
            console.log("no error!");
            var songInfo = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (songInfo[i] != undefined) {
                    var spotifyResults = 
                    "Artist: " + songInfo[i].artists[0].name + "\r\n" +
					"Song: " + songInfo[i].name + "\r\n" +
					"Album: " + songInfo[i].album.name + "\r\n" +
					"Preview Url: " + songInfo[i].preview_url + "\r\n" + 
					"------------------------------ " + i + " ------------------------------" + "\r\n";
					console.log(spotifyResults);
                }
            }
        } else {
            console.log("to err is human, to forgive, divine" + "\r\n" + error);
            return;
        }
    });
};

function movieThis() {
    console.log("this should work! it isn't working currently"); 
    var moviearray = "";
    for(var i=3; i < process.argv; i++)
    {
        moviearray = moviearray + "+" + process.argv[i];
    }

    console.log(moviearray);

    var movie = process.argv[3];
    console.log(movie);
    if (!movie) {
        console.log("No movie has been entered?  That's okay, I've got a great movie suggestion for you!");
        movie = "Pan's Labyrinth";
    }
    params = movie;

    console.log("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy");

    request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy", function (error, response, body) {
        console.log(response.StatusCode); 
    if (!error && response.StatusCode == 200) {
            var body = JSON.parse(body);
            console.log(body);
            var body = "Here are the stats for your movie!" + "\r\n" +
            "Title: " + body.Title + "\r\n" +
            "Year: " + body.Year + "\r\n" +
            "Imdb Rating: " + body.imdbRating + "\r\n" +
            "Rotten Tomatoes Rating: " + body.tomatoRating+"\r\n" +
            "Country: " + body.Country + "\r\n" +
            "Language: " + body.Language + "\r\n" +
            "Plot: " + body.Plot + "\r\n" +
            "Actors: " + body.Actors + "\r\n";
            console.log(body);
        } else {
            console.log("to err is human, to forgive, divine" + "\r\n" + error);
            return;
        }
    });
};

function doWhatItSays () {
    console.log("Do What It Says function is functioning!");
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (!error) {
            console.log("let's have a nice chill song for you");
            pleaseDoWhatItSays = data.split(",");
            spotifyThisSong(pleaseDoWhatItSays[0],pleaseDoWhatItSays[1]);
        } else {
            console.log("to err is human, to forgive, divine" + "\r\n" + error);
        }
    });
};


    // 8. At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:

// ```js
// require("dotenv").config();
// ```

// 9. Add the code required to import the `keys.js` file and store it in a variable.
  
// * You should then be able to access your keys information like so

//   ```js
//   var spotify = new Spotify(keys.spotify);
//   var client = new Twitter(keys.twitter);
//   ```
