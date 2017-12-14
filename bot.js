// Dependencies =========================
var
    twit = require('twit'),
    config = require('./config');

var Twitter = new twit(config);

// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params
var retweet = function() {
    var params = {
        q: '#pizza',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    }
    Twitter.get('search/tweets', params, function(err, data) {
        // if there no errors
        if (!err) {
            // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
        }
        // if unable to Search a tweet
        else {
            console.log('Something went wrong while SEARCHING...');
        }
    });
}

// grab & retweet as soon as program is running...
retweet();
// retweet in every 50 minutes
// setInterval(retweet, 3000000);

// FAVORITE BOT====================

// find a random tweet and 'favorite' it
var favoriteTweet = function(){
    var params = {
        q: '#pizza',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    }
    // find the tweet
    Twitter.get('search/tweets', params, function(err,data){

        // find tweets
        var tweet = data.statuses;
        var randomTweet = ranDom(tweet);   // pick a random tweet

        // if random tweet exists
        if(typeof randomTweet != 'undefined'){
            // Tell TWITTER to 'favorite'
            Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
                // if there was an error while 'favorite'
                if(err){
                    console.log('CANNOT BE FAVORITE... Error');
                }
                else{
                    console.log('FAVORITED... Success!!!');
                }
            });
        }
    });
}
// grab & 'favorite' as soon as program is running...
favoriteTweet();
// 'favorite' a tweet in every 60 minutes
// setInterval(favoriteTweet, 3600000);

//
// let phraseArray = [
//     "Tamara Rules",
//     "Garlic Bread 4 lyf",
//     "dogs ftw",
//     "greetings",
//     "tweet tweet move ur feet",
//     "hi",
//     "maths lol",
//     "computerz"
// ];
//
// Twitter.tweet(phraseArray[ranDom(phraseArray)]);
//

// function to generate a random tweet tweet
function ranDom (arr) {
    var index = Math.floor(Math.random()*arr.length);
    return arr[index];
};