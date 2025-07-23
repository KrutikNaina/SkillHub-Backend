import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profile.routes.js';
import './config/passportConfig.js';
import skillRoutes from './routes/skill.routes.js'
import starRoutes from './routes/star.routes.js';
import followerRoutes from './routes/follower.routes.js';
import progressLogRoutes from './routes/progressLog.routes.js'
import milestoneRoutes from './routes/milestone.routes.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS MUST be early
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Body parser
app.use(express.json());

// Session and Passport
app.use(session({
  secret: process.env.JWT_SECRET || 'keyboardcat',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ DB Error', err));

// Routes
app.use('/auth', authRoutes);
app.use('/api/profiles', profileRoutes);

// Default response
app.get('/', (req, res) => {
  res.send('🌐 Backend is running');
});

// skills api
app.use('/api/skills', skillRoutes)

// stars api
app.use('/api/stars', starRoutes);

// follower api
app.use('/api/followers', followerRoutes);

// progresslogs api
app.use('/api/progresslogs', progressLogRoutes)

// milestones api
app.use('/api/milestones', milestoneRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
