// controllers/milestone.controller.js
import Milestone from '../models/Milestone.model.js'

// Fetch all milestones of a user
export const getUserMilestones = async (req, res) => {
  try {
    const userId = req.user._id;
    const milestones = await Milestone.find({ userId }).sort({ achievedOn: -1 });
    const count = milestones.length;
    res.status(200).json({ count, milestones });
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching milestones' });
  }
};

// Create a new milestone
export const createMilestone = async (req, res) => {
  try {
    const { type, badge, achievedOn } = req.body;
    const milestone = await Milestone.create({
      userId: req.user._id,
      type,
      badge,
      achievedOn: achievedOn || new Date(),
    });
    res.status(201).json(milestone);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating milestone' });
  }
};

// Fetch total milestones count for the user
export const getMilestonesCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const count = await Milestone.countDocuments({ userId });
    res.status(200).json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching milestone count' });
  }
};
