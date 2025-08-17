// routes/skillroutes.js
import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createSkill,
  getMySkills,
  deleteSkill,
  updateSkill,
  getSkillById,
} from "../controllers/skill.controller.js";

const router = express.Router();

router.post("/add", authenticate, createSkill);
router.get("/", authenticate, getMySkills);
router.get("/:id", authenticate, getSkillById); // ✅ DETAILS ROUTE
router.delete("/:id", authenticate, deleteSkill);
router.put("/:id", authenticate, updateSkill);

export default router;
