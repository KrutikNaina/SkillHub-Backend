// routes/milestone.routes.js

import express from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import { getUserMilestones, createMilestone } from '../controllers/milestone.controller.js'

const router = express.Router()

// ✅ Fetch all milestones of a user
router.get('/user', authenticate, getUserMilestones)

// ✅ Create a new milestone (badge/streak)
router.post('/create', authenticate, createMilestone)

export default router
