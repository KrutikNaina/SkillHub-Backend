// controllers/star.controller.js
import Star from '../models/Star.model.js';

export const starSkill = async (req, res) => {
  try {
    const { userId, skillId } = req.body;

    // Prevent duplicate stars
    const alreadyStarred = await Star.findOne({ userId, skillId });
    if (alreadyStarred) {
      return res.status(400).json({ message: 'Skill already starred' });
    }

    const newStar = new Star({ userId, skillId });
    await newStar.save();

    res.status(201).json({ message: 'Skill starred successfully', star: newStar });
  } catch (err) {
    res.status(500).json({ message: 'Error starring skill', error: err.message });
  }
};

export const getStarsBySkill = async (req, res) => {
  try {
    const { skillId } = req.params;

    const stars = await Star.find({ skillId });
    res.status(200).json({ totalStars: stars.length, stars });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stars', error: err.message });
  }
};

export const unstarSkill = async (req, res) => {
  try {
    const { userId, skillId } = req.body;

    await Star.findOneAndDelete({ userId, skillId });

    res.status(200).json({ message: 'Skill unstarred successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error unstarring skill', error: err.message });
  }
};
