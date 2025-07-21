import express from 'express'
import {
  createSkill,
  getUserSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skillController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect)

router.post('/', createSkill)
router.get('/', getUserSkills)
router.get('/:id', getSingleSkill)
router.put('/:id', updateSkill)
router.delete('/:id', deleteSkill)

export default router
