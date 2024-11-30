const { Expo } = require('expo-server-sdk');
const cron = require('node-cron'); // For scheduling
const TokenModel = require('../models/TokenModel'); // Model for storing user tokens
const QuoteModel = require('../models/QuotesModel'); // Model for storing quotes

const expo = new Expo();

function getFirstFiveWords(text) {
  const words = text.split(' ');  // Split the string by spaces into words
  const firstFiveWords = words.slice(0, 5).join(' ');  // Get the first 5 words and join them back into a string
  
  // If there are more than 5 words, add '...'
  return words.length > 5 ? `${firstFiveWords}...` : firstFiveWords;
}



// Function to send daily quote notification
const sendDailyQuote = async () => {
  try {
    // Fetch all tokens
    const tokens = await TokenModel.find().select('token -_id');
    if (!tokens.length) {
      console.log('No users found for notifications');
      return;
    }
    await QuoteModel.findOneAndDelete({}, { sort: { createdAt: 1 } });


    const quote = await QuoteModel.findOne().sort({ createdAt: 1 });

    console.log(quote)
    if(!quote){
      console.log('No quotes found');
      return;
    }
    const data=getFirstFiveWords(quote.quote)
    const messages = tokens.map((entry) => ({
        to: entry.token,
        sound: 'default',
        title:'Quote of the day ',
        body: `${data}`,
      }));



 
    const chunks = expo.chunkPushNotifications(messages);
    for (const chunk of chunks) {
      try {
        await expo.sendPushNotificationsAsync(chunk);
        
    } catch (error) {
        console.error('Error sending notification chunk:', error);
    }
}


    console.log('Daily quote sent and removed from queue.');
  } catch (error) {
    console.error('Error in sending daily quote:', error);
  }
};

// Schedule the cron job to run daily at 9:00 AM
cron.schedule('0 8,18 * * *', async () => {
  console.log('Cron job triggered to send daily quote.');
  try {
    await sendDailyQuote();
    console.log('Daily quote notification sent successfully!');
  } catch (error) {
    console.error('Error in cron job:', error.message);
  }
});

module.exports = {
  sendDailyQuote, 
};
