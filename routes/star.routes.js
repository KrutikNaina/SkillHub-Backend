import express from 'express';
import { starSkill, getStarsBySkill, unstarSkill } from '../controllers/star.controller.js';

const router = express.Router();

router.post('/star', starSkill);               // ⭐ Add a star
router.get('/skill/:skillId', getStarsBySkill); // 🔍 Get stars of a skill
router.post('/unstar', unstarSkill);           // ❌ Remove star

export default router;
