// controllers/milestone.controller.js

import Milestone from '../models/Milestone.model.js'

// 📌 Get milestones of logged-in user
export const getUserMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.find({ userId: req.user._id }).sort({ createdAt: -1 })
    res.json(milestones)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching milestones', error })
  }
}

// 📌 Create a new milestone
export const createMilestone = async (req, res) => {
  try {
    const { skillId, type, badge } = req.body

    const milestone = new Milestone({
      userId: req.user._id,
      skillId,
      type,
      badge
    })

    await milestone.save()
    res.status(201).json(milestone)
  } catch (error) {
    res.status(500).json({ message: 'Error creating milestone', error })
  }
}
