import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createSkill,
  getMySkills,
  deleteSkill,
  updateSkill,
  getSkillById,
  getSkillsCount,
} from "../controllers/skill.controller.js";

const router = express.Router();

router.post("/add", authenticate, createSkill);
router.get("/", authenticate, getMySkills);
router.get("/count", authenticate, getSkillsCount);
router.get("/:id", authenticate, getSkillById);
router.delete("/:id", authenticate, deleteSkill);
router.put("/:id", authenticate, updateSkill);

export default router;