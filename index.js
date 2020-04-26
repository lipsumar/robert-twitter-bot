require('dotenv').config();

const Twitter = require('twitter');
const cron = require('node-cron');
const getRandomJoke = require('./getRandomJoke')
const client = new Twitter(require('./credentials'));

async function tweetJoke() {
  try{
    const joke = await getRandomJoke();
    
    client.post(
      'statuses/update', 
      { status: joke },
      (error, tweet, response) => {
        if(error) throw error;
        console.log('Tweeted: ' + joke)
      }
    );
  }catch(err){
    console.log('Error!', err)
  }
}

cron.schedule('0 10,15 * * *', tweetJoke);
