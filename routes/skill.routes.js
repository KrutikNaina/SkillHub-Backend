import express from 'express';
import { createSkill, getAllSkills, updateSkill } from '../controllers/skill.controller.js';

const router = express.Router();

router.post('/create', createSkill);
router.get('/', getAllSkills);
router.put('/:id', updateSkill); // ✅ Update Skill by ID

export default router;
