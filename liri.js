var fs = require("fs");
// this one reads/writes files!
var request = require("request");
// this one makes requests!

var keys = require('./keys.js');
 var twitter = require('twitter');
var spotify = require('node-spotify-api');

var spotify = new spotify(keys.spotify);
var client = new twitter(keys.twitter);

var givenArg = process.argv[2];

// function isitworking() {
//     console.log(givenArg);
// };

// isitworking();

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
    "1. node liri.js my-tweets " + "\r\n" +
    "2. node liri.js spotify-this-song " + "\r\n" +
    "2b: you can add 'any song title' to this and it will find that song title" + "\r\n" +
    "3. node liri.js movie-this 'any movie title' " + "\r\n" +
    "3b: you can add 'any movie title' to this and it will find that movie title" + "\r\n" +
    "4. node liri.js do-what-it-says");
 }


function myTweets() {
    console.log("\r\n" + "~ have some tweets ~" + "\r\n");
    var client = new twitter( {
        consumer_key: keys.twitter.consumer_key,
        consumer_secret: keys.twitter.consumer_secret,
        access_token_key: keys.twitter.access_token_key,
        access_token_secret: keys.twitter.access_token_secret,
    });
    var twitterUserName = process.argv[3];
    if(!twitterUserName) {
        twitterUserName = "thedayswillral1"
    }
    var params = {screen_name: twitterUserName, count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for(var i = 0; i < tweets.length; i++) {
                    var twitterResults = 
                    tweets[i].user.screen_name + ": " + 
					tweets[i].text + "\r\n" + 
					tweets[i].created_at + "\r\n" + 
					"------------------------------ " + i + " ------------------------------" + "\r\n";
                    console.log(twitterResults);
            }
        } else {
            console.log("to err is human, to forgive, divine" + "\r\n" + "Your error was: " + error);
            return;
        }
    });
};

function spotifyThisSong() {
    console.log("\r\n" + "~ have some music ~" + "\r\n");
    var songTitle = process.argv[3];
    console.log(songTitle);
    if (!songTitle) {
        console.log("No song has been entered?  That's okay, I've got a great song for you!");
        songTitle = "Mr Blue Sky";
    }
    params = songTitle;
    spotify.search({type: "track", query: params}, function(err, data) {
        if (!err) {
            console.log("no error!  only music!");
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
            console.log("to err is human, to forgive, divine" + "\r\n" + "Your error was: " + error);
            return;
        }
    });
};

function movieThis() {
    console.log("\r\n" + "Movietime!!" + "\r\n"); 
    var movie = process.argv[3];
    if (!movie) {
        console.log("No movie has been entered?  That's okay, I've got a great movie suggestion for you!");
        movie = "Volver";
    }
    params = movie;
    var movieURL = "http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy"; 
    request(movieURL, function (error, response, body) {
    if (!error) {
            var body = JSON.parse(body);
            var body = "Here are the stats for your movie!" + "\r\n" +
            " ---------------------- "  + "\r\n" +
            "Title: " + body.Title + "\r\n" +
            "Year: " + body.Year + "\r\n" +
            "Imdb Rating: " + body.imdbRating + "\r\n" +
            "Rotten Tomatoes Rating: " + body.tomatoRating+"\r\n" +
            "Country: " + body.Country + "\r\n" +
            "Language: " + body.Language + "\r\n" +
            "Plot: " + body.Plot + "\r\n" +
            "Actors: " + body.Actors + "\r\n" + 
            " ---------------------- ";
            console.log(body);
        } else {
            console.log("to err is human, to forgive, divine" + "\r\n" + "Your error was: " + error);
            return;
        }
    });
};

function doWhatItSays () {
    console.log("\r\n" + "Do What It Says function is functioning!" + "\r\n");
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (!error) {
            console.log(" ~ let's have a nice chill song for you ~ ");
            pleaseDoWhatItSays = data.split(",");
            spotifyThisSong(pleaseDoWhatItSays[0],pleaseDoWhatItSays[1]);
        } else {
            console.log("to err is human, to forgive, divine" + "\r\n" + "Your error was: " + error);
        }
    });
};
