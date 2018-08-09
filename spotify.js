require("dotenv").config();
const Spotify = require('node-spotify-api');
const fs = require('fs');
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);


async function spotifySearch(arg) {
  if (process.argv[3] === undefined) {
    return console.log("Please search for a song. node liri.js spotify-this-song 'yo diggity'");
  }
  let results = await spotify.search({query: encodeURIComponent(arg.trim()), type:'track', limit:1});
  if (results.tracks.items.length < 1) {
    return console.log("No spotify song found.");
  };
  let returnObj = {
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

exports.spotifySearch = spotifySearch;

