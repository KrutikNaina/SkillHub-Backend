// routes/profile.routes.js
import express from 'express'
import Profile from '../models/Profile.js'

const router = express.Router()

// POST: Create Profile
router.post('/create', async (req, res) => {
  try {
    const profile = new Profile(req.body)
    await profile.save()
    res.status(201).json({ message: 'Profile created successfully!', profile })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
