import express from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import { 
  getUserProgressLogs, 
  createProgressLog, 
  getProgressLogsCount, 
  deleteProgressLog,
  getProgressLogById,   // ✅ single log
  updateProgressLog     // ✅ update
} from '../controllers/progressLog.controller.js'

const router = express.Router()

router.get('/user', authenticate, getUserProgressLogs)
router.get('/count', authenticate, getProgressLogsCount)
router.post('/create', authenticate, createProgressLog)
router.get('/:id', authenticate, getProgressLogById) // ✅ single log
router.put('/:id', authenticate, updateProgressLog)  // ✅ update
router.delete('/:id', authenticate, deleteProgressLog)

export default router
