import express from "express";
import { getFeed } from "../controllers/feed.controller.js";
import { authenticate } from "../middleware/authMiddleware.js"; // 🔑 your existing JWT/passport middleware

const router = express.Router();

// protected route, user must be logged in
router.get("/", authenticate, getFeed);

export default router;
