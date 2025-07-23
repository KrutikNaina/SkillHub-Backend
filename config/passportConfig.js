import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import Profile from '../models/Profile.model.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user exists
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      // Create new user
      user = await User.create({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
      });
    }

    // 🔥 Create or update profile
    const existingProfile = await Profile.findOne({ userId: user._id });

    if (!existingProfile) {
      await Profile.create({
        userId: user._id,
        fullName: user.displayName,
        avatar: user.avatar,
      });
    }

    return done(null, user);
  } catch (error) {
    console.error('Passport Google Strategy Error:', error);
    return done(error, null);
  }
}));

// Serialize and Deserialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
