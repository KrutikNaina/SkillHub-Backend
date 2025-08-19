import express from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import { 
  getUserProgressLogs, 
  createProgressLog, 
  getProgressLogsCount, 
  deleteProgressLog   // ✅ import new
} from '../controllers/progressLog.controller.js'

const router = express.Router()

router.get('/user', authenticate, getUserProgressLogs)
router.get('/count', authenticate, getProgressLogsCount)
router.post('/create', authenticate, createProgressLog)
router.delete('/:id', authenticate, deleteProgressLog) // ✅ delete route

export default router
