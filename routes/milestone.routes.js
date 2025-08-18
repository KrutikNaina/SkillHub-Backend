// milestone.routes.js
import express from 'express';
import {
  createMilestone,
  getUserMilestones,
  getSkillMilestones,
  deleteMilestone
} from '../controllers/milestone.controller.js';

const router = express.Router();

router.post('/', createMilestone);
router.get('/user/:userId', getUserMilestones);
router.get('/skill/:skillId', getSkillMilestones);
router.delete('/:milestoneId', deleteMilestone);

export default router;
