// Dependencies =========================
let twit = require('twit');
let config = require('./config');

let poetry = require('./textAnalysis/index');

let Twitter = new twit(config);

// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params
let retweet = function() {
    const params = {
        q: '#garlicBread',  // REQUIRED
        result_type: 'mixed',
        lang: 'en'
    };
    Twitter.get('search/tweets', params, function(err, data) {
        // if there no errors
        if (!err) {

            // find tweets
            let tweet = data.statuses;
            let randomTweet = ranDom(tweet);   // pick a random tweet

            // if random tweet exists

            if(typeof randomTweet !== 'undefined'){
                // Tell TWITTER to retweet
                Twitter.post('statuses/retweet/:id', {
                    id: randomTweet.id_str
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
        }
        // if unable to Search a tweet
        else {
            console.log('Something went wrong while SEARCHING...');
        }
    });
};

// grab & retweet as soon as program is running...
// retweet();


// FAVORITE BOT====================

// find a random tweet and 'favorite' it
let favoriteTweet = function(){
    const params = {
        q: '#garlicBread',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    };
    // find the tweet
    Twitter.get('search/tweets', params, function(err,data){

        if(!err){
            // find tweets
            let tweet = data.statuses;
            let randomTweet = ranDom(tweet);   // pick a random tweet

            // if random tweet exists
            if(typeof randomTweet !== 'undefined'){
                // Tell TWITTER to 'favorite'
                Twitter.post('favorites/create', {
                    id: randomTweet.id_str
                }, function(err, response){
                    // if there was an error while 'favorite'
                    if(err){
                        console.log('CANNOT BE FAVORITE... Error');
                    }
                    else{
                        console.log('FAVORITED... Success!!!');
                    }
                });
            }
        }
        // if unable to Search a tweet
        else {
            console.log('Something went wrong while SEARCHING...');
        }


    });
};

// favoriteTweet();

// create new tweet
let postTweet = function(){

    poetry.returnPoem()
        .then(result => {
            Twitter.post('statuses/update',{status: result} , function(err, response){
                // if there was an error while 'favorite'
                if(err){
                    console.log('CANNOT POST ... error ');
                    console.log(err);
                }
                else{
                    console.log('POSTED... Success!!!');
                }
            });
        });
};

postTweet();



// function to generate a random tweet tweet
function ranDom (arr) {
    var index = Math.floor(Math.random()*arr.length);
    return arr[index];
};