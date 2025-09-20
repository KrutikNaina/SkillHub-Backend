// server.js
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// ✅ Import Routes
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profile.routes.js';
import userRoutes from './routes/user.routes.js';
import skillRoutes from './routes/skill.routes.js';
import starRoutes from './routes/star.routes.js';
import followerRoutes from './routes/follower.routes.js';
import progressLogRoutes from './routes/progressLog.routes.js';
import milestoneRoutes from './routes/milestone.routes.js';
import feedRoutes from './routes/feed.routes.js';

// ✅ Passport config
import './config/passportConfig.js';

dotenv.config();
const app = express();

// ✅ CORS
app.use(cors({
  origin: [
    'http://localhost:5173', // Dev frontend
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

// ✅ API Routes
app.use('/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/stars', starRoutes);
app.use('/api/followers', followerRoutes);
app.use('/api/progresslogs', progressLogRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/feed', feedRoutes);

// ✅ Serve React frontend in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  });
}

// ✅ Default route for testing
app.get('/ping', (req, res) => res.send('🏓 Pong! Backend is running'));

// ⚡ Start server (for local dev)
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

export default app;
