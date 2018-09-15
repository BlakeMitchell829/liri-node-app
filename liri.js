require("dotenv").config();

const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const keys = require("./keys");
const request = require("request");
const fs = require("fs");
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

const tweetGet = function () {
    return client.get('statuses/user_timeline', {
        screen_name: 'BootcampH',
        count: 20
    }, function (error, tweets, response) {
        if (!error) {
            let resultArr = ["RT if you're excited for this #BroncosDraft class' debut on Saturday"];
            for (var i = 0; i < tweets.length; i++) {
                resultArr.push(`SCREEN NAME:    ${tweets[i].user.screen_name}     TWEET TEXT:    ${tweets[i].text}      TIME POSTED:      ${tweets[i].created_at}`)
            }
            fs.appendFileSync('./log.txt', JSON.stringify([process.argv[2], resultArr], null, 2), 'utf8');
            return console.log(JSON.stringify(resultArr, null, 2));
        }
    })
};

exports.tweetGet = tweetGet();

const spotifySearch = function () {
  if (process.argv[3] === undefined) {
    return console.log("Please search for a song. node liri.js spotify-this-song 'yo diggity'");
  }
  const results = spotify.search({query: encodeURIComponent(arg.trim()), type:'track', limit:1});
  if (results.tracks.items.length < 1) {
    return console.log("No spotify song found.");
  };
  const returnObj = {
    "Artist(s)": "",
    "Track Name": results.tracks.items[0].name,
    "Preview Link": results.tracks.items[0].preview_url,
    "Album": results.tracks.items[0].album.name
  };
  for (var i = 0; i < results.tracks.items[0].artists.length; i++) {
    if (i == results.tracks.items[0].artists.length-1) {
      returnObj["Artist(s)"] += results.tracks.items[0].artists[i].name
    }
    else {
      returnObj["Artist(s)"] += results.tracks.items[0].artists[i].name + ", "
    }
  };
  if (returnObj["Preview Link"] == null) {
    returnObj["Preview Link"] = results.tracks.items[0].external_urls.spotify
  };
  fs.appendFileSync('./log.txt', JSON.stringify([`${process.argv[2]} -- ${process.argv[3]}`,returnObj], null, 2), 'utf8');
  return console.log(returnObj);
}

exports.spotifySearch = spotifySearch();

const movieGet = function() {
  try {
    const url=`https://www.omdbapi.com/?apikey=454a6e93=${arg}`;
    const response = fetch(url);
    const result = response.json();
    let resultObj = {
      "Title": result.Title,
      "Year": result.Year,
      "IMDB Rating": result.Ratings[0].Value,
      "Rotten Tomatos Rating": result.Ratings[1].Value,
      "Production Country": result.Country,
      "Plot": result.Plot,
      "Acotors": result.Actors
    };
    fs.appendFileSync('./log.txt', JSON.stringify([process.argv[2] + " -- " + process.argv[3], resultObj], null, 2), 'utf8');
    return console.log(JSON.stringify(resultObj, null, 2));
  } catch (error) {
    if (process.argv[3] === undefined) {
      return console.log('Please search for a movie. node liri.js movie-this "crash"');
    }
    return console.log(error);
  }
};

exports.movieGet = movieGet();
