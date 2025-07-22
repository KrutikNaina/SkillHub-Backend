import Skill from '../models/Skill.model.js';

// CREATE Skill
export const createSkill = async (req, res) => {
  try {
    const { userId, title, description, coverImage, startDate, targetGoal } = req.body;

    if (!title || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newSkill = new Skill({ userId, title, description, coverImage, startDate, targetGoal });
    await newSkill.save();

    res.status(201).json({ message: 'Skill created successfully', skill: newSkill });
  } catch (err) {
    res.status(500).json({ message: 'Error creating skill', error: err.message });
  }
};

// GET All Skills
export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching skills', error: err.message });
  }
};

// ✅ UPDATE Skill
export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Skill.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: 'Skill not found' });

    res.status(200).json({ message: 'Skill updated successfully', skill: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating skill', error: err.message });
  }
};
