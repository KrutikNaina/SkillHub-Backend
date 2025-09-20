import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Helper: Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.displayName,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Helper: Send popup response
const sendPopupResponse = (res, token) => {
  const frontendURL =
    process.env.NODE_ENV === "production"
      ? "https://skillhub.krutiknaina.com"
      : "http://localhost:5173";

  res.send(`
    <html><body>
      <script>
        if (window.opener) {
          window.opener.postMessage({
            type: 'oauth-success',
            token: '${token}'
          }, '${frontendURL}');
          window.close();
        } else {
          window.location.href = '${frontendURL}';
        }
      </script>
    </body></html>
  `);
};

// ---------------- GOOGLE ----------------
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account", // ensures account selection on every login
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure", session: false }),
  (req, res) => {
    const token = generateToken(req.user);
    sendPopupResponse(res, token);
  }
);

// ---------------- GITHUB ----------------
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/failure", session: false }),
  (req, res) => {
    const token = generateToken(req.user);
    sendPopupResponse(res, token);
  }
);

// ---------------- FAILURE ----------------
router.get("/failure", (req, res) => {
  res.status(401).send("❌ Authentication Failed");
});

export default router;
