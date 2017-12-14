//config.js
/** TWITTER APP CONFIGURATION
 * consumer_key
 * consumer_secret
 * access_token
 * access_token_secret
 */
module.exports = {
    consumer_key: '28UZ61lzKBCqRGrYSXTy9Cft6',
    consumer_secret: '8nd6Q8XnrhSJvVrSL2KUYphT8gEavj9zTPsLCnyXp3WsfTjNeZ',
    access_token: '934842438996328450-K4wo9ga6Z9VIh4Ig9fzJaGQMSoYMrqK',
    access_token_secret: 'fsgszW7vrupyDgAJ5HY6fAzGy0UoyEgcDXUxQaHAQn8RI'
};


let newKeys = {
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token: process.env.BOT_ACCESS_TOKEN,
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
};
