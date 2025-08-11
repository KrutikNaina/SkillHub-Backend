import express from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import { getUserProgressLogs, createProgressLog } from '../controllers/progressLog.controller.js'

const router = express.Router()

router.get('/user', authenticate, getUserProgressLogs)
router.post('/create', authenticate, createProgressLog)

export default router
