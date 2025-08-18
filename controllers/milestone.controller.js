// milestone.controller.js
import Milestone from '../models/Milestone.model.js';

// Create milestone
export const createMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.create(req.body);
    res.status(201).json(milestone);
  } catch (err) {
    res.status(500).json({ message: 'Error creating milestone', error: err.message });
  }
};

// Get all milestones for a user
export const getUserMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.find({ userId: req.params.userId });
    res.json(milestones);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user milestones', error: err.message });
  }
};

// Get all milestones for a skill
export const getSkillMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.find({ skillId: req.params.skillId });
    res.json(milestones);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching skill milestones', error: err.message });
  }
};

// Delete milestone
export const deleteMilestone = async (req, res) => {
  try {
    await Milestone.findByIdAndDelete(req.params.milestoneId);
    res.json({ message: 'Milestone deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting milestone', error: err.message });
  }
};
