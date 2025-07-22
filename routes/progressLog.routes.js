import express from 'express'
import {
  createProgressLog,
  getLogsBySkill,
  getLogsByUser
} from '../controllers/progressLog.controller.js'

const router = express.Router()

// POST: Create new progress log
router.post('/', createProgressLog)

// GET: Get logs for a specific skill
router.get('/skill/:skillId', getLogsBySkill)

// GET: Get logs by user (optional)
router.get('/user/:userId', getLogsByUser)

export default router
