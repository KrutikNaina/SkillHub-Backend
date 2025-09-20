import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profile.routes.js';
import './config/passportConfig.js';
import skillRoutes from './routes/skill.routes.js';
import starRoutes from './routes/star.routes.js';
import followerRoutes from './routes/follower.routes.js';
import progressLogRoutes from './routes/progressLog.routes.js';
import milestoneRoutes from "./routes/milestone.routes.js";
import userRoutes from './routes/user.routes.js';
import feed from './routes/feed.routes.js';

dotenv.config();
const app = express();

// ✅ CORS
const allowedOrigins = [
  'http://localhost:5173',           // Local frontend
  'https://skillhub.krutiknaina.com' // Deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
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

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ DB Error', err));

// ✅ Routes
app.use('/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/stars', starRoutes);
app.use('/api/followers', followerRoutes);
app.use('/api/progresslogs', progressLogRoutes);
app.use("/api/milestones", milestoneRoutes);
app.use("/api/feed", feed);

// ✅ Default route
app.get('/', (req, res) => {
  res.send('🌐 Backend is running');
});

export default app;
