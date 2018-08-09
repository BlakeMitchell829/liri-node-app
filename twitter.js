require("dotenv").config();
const keys = require("./keys.js");
const fs = require('fs');
const Twitter = require('twitter');
const client = new Twitter(keys.twitter);
let tweetGet = function () {
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

exports.tweetGet = tweetGet;