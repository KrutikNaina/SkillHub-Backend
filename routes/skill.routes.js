// backend/routes/skill.routes.js
import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { createSkill, getMySkills } from "../controllers/skill.controller.js";

const router = express.Router();

router.post("/add", authenticate, createSkill);
router.get("/", authenticate, getMySkills);  // Return only logged-in user's skills

export default router;
