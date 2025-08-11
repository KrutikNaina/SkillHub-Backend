import express from "express";
import { createSkill } from "../controllers/skill.controller.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔐 Protect this route with JWT token
router.post("/add", authenticate, createSkill);

export default router;
