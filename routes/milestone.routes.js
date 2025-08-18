import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { getUserMilestones, createMilestone, getMilestonesCount } from '../controllers/milestone.controller.js';

const router = express.Router();

// Fetch all milestones of a user
router.get('/user', authenticate, getUserMilestones);

// Fetch milestone count
router.get('/count', authenticate, getMilestonesCount);

// Create a new milestone (badge/streak)
router.post('/create', authenticate, createMilestone);

export default router;
