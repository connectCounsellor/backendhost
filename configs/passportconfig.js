const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/userModel')

// Assuming the user model is located here

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID ,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET ,
    callbackURL: `${process.env.BACKEND_API}/auth/google/callback`
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if the user exists
      let user = await User.findOne({ email: profile.emails[0].value });

      if (!user) {
        // If not, create a new user
        user = new User({
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          phoneNumber: profile.phoneNumber || '', // Add phone number if available
        });
        await user.save();
      }

      // Attach user to the request for further use
      return done(null, user);
    } catch (error) {
      console.error('Error in Google strategy:', error);
      return done(error, false);
    }
  }
));
