import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

// ---------------- GOOGLE ----------------
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user._id,
        name: req.user.displayName,
        email: req.user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.send(`
      <html><body>
        <script>
          window.opener.postMessage({
            type: 'oauth-success',
            token: '${token}'
          }, 'http://localhost:5173');
          window.close();
        </script>
      </body></html>
    `);
  }
);

// ---------------- GITHUB ----------------
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user._id,
        name: req.user.displayName,
        email: req.user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.send(`
      <html><body>
        <script>
          window.opener.postMessage({
            type: 'oauth-success',
            token: '${token}'
          }, 'http://localhost:5173');
          window.close();
        </script>
      </body></html>
    `);
  }
);

router.get('/failure', (req, res) => {
  res.send('Authentication Failed');
});

export default router;
