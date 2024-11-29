const { Expo } = require('expo-server-sdk');
// const cron = require('node-cron'); // For scheduling
const TokenModel = require('../models/TokenModel'); // Model for storing user tokens
// const QuoteModel = require('../models/Quote'); // Model for storing quotes

const expo = new Expo();

// Function to send daily quote notification
const sendDailyQuote = async () => {
  try {
    // Fetch all tokens
    const tokens = await TokenModel.find().select('token -_id');
    if (!tokens.length) {
      console.log('No users found for notifications');
      return;
    }

    // Fetch the first quote in the queue
    // const quote = await QuoteModel.findOne();
    // if (!quote) {
    //   console.log('No quotes available in the queue');
    //   return;
    // }

    // Create notification messages for all users
    // const messages = tokens.map((token) => ({
    //   to: token.token,
    //   sound: 'default',
    //   body: `Quote of the day: ${quote.text}`,
    // }));

    // const tokens = ['6IVaYGFjy4tVI-1jWji-Zq'];
    const messages = tokens.map((token) => ({
        to: token,
        sound: 'default',
        body: `Quote of the day: hello from prathmesh`,
      }));
  



    // Chunk and send notifications
    const chunks = expo.chunkPushNotifications(messages);
    for (const chunk of chunks) {
      try {
        await expo.sendPushNotificationsAsync(chunk);
      } catch (error) {
        console.error('Error sending notification chunk:', error);
      }
    }

    // Delete the used quote from the queue
    // await QuoteModel.deleteOne({ _id: quote._id });
    console.log('Daily quote sent and removed from queue.');
  } catch (error) {
    console.error('Error in sending daily quote:', error);
  }
};

// Schedule the cron job to run daily at 9:00 AM
// cron.schedule('0 9 * * *', async () => {
//   console.log('Cron job triggered to send daily quote.');
//   try {
//     await sendDailyQuote();
//     console.log('Daily quote notification sent successfully!');
//   } catch (error) {
//     console.error('Error in cron job:', error.message);
//   }
// });

module.exports = {
  sendDailyQuote, // For manual testing if needed
};
