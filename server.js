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
app.use('/api/profile', profileRoutes);

// Default response
app.get('/', (req, res) => {
  res.send('🌐 Backend is running');
});

// skills api
app.use('/api/skills', skillRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
