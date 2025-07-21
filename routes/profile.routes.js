import express from 'express'
import Profile from '../models/Profile.model.js'

const router = express.Router()

// This is your route:
router.get('/:userId', async (req, res) => {
  const profile = await Profile.findOne({ userId: req.params.userId })
  if (!profile) return res.status(404).json({ message: 'Profile not found' })
  res.json(profile)
})

export default router
