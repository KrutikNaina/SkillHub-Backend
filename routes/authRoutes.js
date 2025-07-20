// routes/authRoutes.js
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Step 1: Google Auth Entry Point
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// Step 2: Google Auth Callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    // Create JWT token
    const token = jwt.sign(
      {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 🔁 Redirect to frontend profile page with token
    res.redirect(`http://localhost:5173/profile?token=${token}`);
  }
);

// Optional failure route
router.get('/failure', (req, res) => {
  res.send('Google Authentication Failed');
});

export default router;