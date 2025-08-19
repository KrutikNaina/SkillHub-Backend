import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/User.js';
import Profile from '../models/Profile.model.js';
import dotenv from 'dotenv';

dotenv.config();

// ✅ GOOGLE STRATEGY
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = await User.create({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails?.[0]?.value,
          avatar: profile.photos?.[0]?.value,
        });
      }

      const existingProfile = await Profile.findOne({ userId: user._id });
      if (!existingProfile) {
        await Profile.create({
          userId: user._id,
          fullName: user.displayName,
          avatar: user.avatar,
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// ✅ GITHUB STRATEGY
passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback',
    scope: ['user:email'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let email = null;

      // Some GitHub accounts don't have public email
      if (profile.emails && profile.emails.length > 0) {
        email = profile.emails[0].value;
      }

      let user = await User.findOne({ githubId: profile.id });

      if (!user) {
        user = await User.create({
          githubId: profile.id,
          displayName: profile.displayName || profile.username,
          email: email,
          avatar: profile.photos?.[0]?.value,
        });
      }

      const existingProfile = await Profile.findOne({ userId: user._id });
      if (!existingProfile) {
        await Profile.create({
          userId: user._id,
          fullName: user.displayName,
          avatar: user.avatar,
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

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
