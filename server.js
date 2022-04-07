const express = require('express')
const app = express()
var Twitter = require("twitter");
require("dotenv").config();

var client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  });

const used = []
const log = console.log;
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/twitter/message", async(req, res) => {
    function postToTwitter(tweet) {
        client.post(
          "statuses/update",
          { status: tweet },
          function (error, tweet, response) {
            if (error) log(error);
            /* log(tweet); // Tweet body. */
          }
        );
    }    
    const tweet2 = req.body;
    const addy = tweet2.address;
    const tweet = tweet2.name;
    if (used.includes(addy)){
        console.log("Used")
        res.send("Used Already");
    } else { 
        used.push(addy)
        try {
            const response = await postToTwitter(tweet);
            res.send("Your Tweet is Live");
        } catch (error) {
            res.status(500).json({
                message: 'Not able to post'
            });
        }
    }
    console.log(tweet)
    console.log(addy)
    console.log(used)
});

app.listen(5000, () => {console.log("Server started on port 5000")})