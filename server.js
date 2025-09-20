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

// ✅ CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://skillhub-frontend.vercel.app',
    'https://skillhub.krutiknaina.com'
  ],
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

// ⚠️ Do NOT listen on PORT in Vercel
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

export default app;
