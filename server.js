import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profile.routes.js';
import userRoutes from './routes/user.routes.js';
import skillRoutes from './routes/skill.routes.js';
import starRoutes from './routes/star.routes.js';
import followerRoutes from './routes/follower.routes.js';
import progressLogRoutes from './routes/progressLog.routes.js';
import milestoneRoutes from './routes/milestone.routes.js';
import feedRoutes from './routes/feed.routes.js';

import './config/passportConfig.js';

dotenv.config();
const app = express();

// ✅ CORS: dynamic based on environment
const allowedOrigins = [
  'http://localhost:5173', // local frontend
  'https://skillhub.krutiknaina.com', // production frontend
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('CORS policy: origin not allowed'));
  },
  credentials: true,
}));

// ✅ Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ Sessions
app.use(session({
  secret: process.env.JWT_SECRET || 'keyboardcat',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ DB Error', err));

// ✅ Routes
app.use('/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/stars', starRoutes);
app.use('/api/followers', followerRoutes);
app.use('/api/progresslogs', progressLogRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/feed', feedRoutes);

// ✅ Default route
app.get('/', (req, res) => res.send('🌐 Backend is running'));

// ⚠️ For Vercel deployment, do NOT use app.listen()
// export app for serverless deployment
export default app;
