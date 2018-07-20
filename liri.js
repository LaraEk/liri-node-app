
var fs = require("fs");
// this one reads/writes files!
var request = require("request");
// this one makes requests!


var keys = require('./keys.js');
// var twitter = require('twitter');
// var spotify = require('spotify');


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
    console.log("I am working on this now");
    var songTitle = process.argv[3];
    console.log(songTitle);
    if (!songTitle) {
        console.log("that's okay, I've got a great song for you!");
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
    var movie = process.argv[3];
    console.log(movie);
    if (!movie) {
        movie = "dark city";
    }
    params = movie 
    request = ("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy", function (error, response, body) {
        if (!error && response.StatusCode == 200) {
            var movieObject = JSON.parse(body);
            console.log(movieObject);
            var movieResults = "Here are the stats for your movie!" + "\r\n" +
            "Title: " + movieObject.Title + "\r\n" +
            "Year: " + movieObject.Year + "\r\n" +
            "Imdb Rating: " + movieObject.imdbRating + "\r\n" +
            "Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n" +
            "Country: " + movieObject.Country + "\r\n" +
            "Language: " + movieObject.Language + "\r\n" +
            "Plot: " + movieObject.Plot + "\r\n" +
            "Actors: " + movieObject.Actors + "\r\n";
            console.log(movieResults);
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
