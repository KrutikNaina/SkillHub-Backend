import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { createSkill, getMySkills, deleteSkill, updateSkill } from "../controllers/skill.controller.js";

const router = express.Router();

router.post("/add", authenticate, createSkill);
router.get("/", authenticate, getMySkills);
router.delete("/:id", authenticate, deleteSkill);
router.put("/:id", authenticate, updateSkill); // ✅ UPDATE route

export default router;
