require("dotenv").config();

let fs = require("fs");
let spotify = require("./bin/spotifyAPI.js");
let movies = require("./bin/movies.js");
let twitter = require("./bin/twitter.js");
//=============================================================================================================

let args = process.argv.slice(2);

function switcher(arg, arg2) {
  if (args[1] !== undefined) {
    arg2 = args[1];
  };
  switch (arg) {
    case "spotify-this-song":
    return spotify.spotifySearch(arg2);
    break;
    case "movie-this":
    return movies.movieGet(arg2);
    break;
    case "my-tweets":
    return twitter.tweetGet();
    break;
    case "do-what-it-says":
    let randomTxt = function() {
      const data = fs.readFileSync("./bin/random.txt", 'utf8');
      let cmdArr;
      if (data.includes(',')) {
        cmdArr = data.trim().split(',');
        process.argv.push(cmdArr[1]);
        switcher(cmdArr[0], cmdArr[1]);
      } else {
        cmdArr = [data.trim()];
        switcher(cmdArr[0]);
      }
    };
    return randomTxt();
    break;
  }
}

switcher(args[0]);

