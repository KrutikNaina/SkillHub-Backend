import express from "express";
import { createSkill, getSkills } from "../controllers/skill.controller.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authenticate, createSkill); // existing add
router.get("/", authenticate, getSkills);       // new get

export default router;
