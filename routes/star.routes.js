// backend/routes/skill.routes.js
import express from "express";
import { createSkill, getSkills, getMySkills } from "../controllers/skill.controller.js";
// import { isAuthenticated } from "../middleware/authMiddleware.js"; // optional if you have auth

const router = express.Router();

// Create a skill
// router.post("/create", isAuthenticated, createSkill); // If using token auth
router.post("/create", createSkill); // No auth

// Get all skills
router.get("/", getSkills);

// Get my skills (by token or by URL param)
router.get("/my", getMySkills);

export default router;
