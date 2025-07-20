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

// ✅ Step 2: Google Auth Callback (updated for popup flow)
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

    // Send token to opener window and close popup
    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'oauth-success',
                token: '${token}'
              }, '*');
              window.close();
            } else {
              document.body.innerText = "Login success, but can't communicate with main window.";
            }
          </script>
        </body>
      </html>
    `);
  }
);

// Optional failure route
router.get('/failure', (req, res) => {
  res.send('Google Authentication Failed');
});

export default router;
