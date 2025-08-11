import Skill from "../models/skill.model.js";

export const createSkill = async (req, res) => {
  try {
    const {
      title,
      description,
      coverImage,
      startDate,
      targetGoal
    } = req.body;

    // 🔐 get user from token
    const userId = req.user._id;

    const skill = await Skill.create({
      userId,
      title,
      description,
      coverImage,
      startDate,
      targetGoal
    });

    res.status(201).json({
      message: "Skill created successfully",
      skill
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create skill",
      error: error.message
    });
  }
};
