// backend/controllers/skill.controller.js
import Skill from "../models/skill.model.js";

// 📌 Create a new skill
export const createSkill = async (req, res) => {
  try {
    const { title, description, coverImage, startDate, targetGoal } = req.body;

    // If you use authentication middleware, userId can come from req.user
    const userId = req.user?._id || req.body.userId; 

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

// 📌 Get all skills
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch skills",
      error: error.message
    });
  }
};

// 📌 Get skills by logged-in user
export const getMySkills = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const skills = await Skill.find({ userId });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user skills",
      error: error.message,
    });
  }
};
// 📌 Delete a skill by ID (only if it belongs to the logged-in user)
export const deleteSkill = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    const skill = await Skill.findOneAndDelete({ _id: id, userId });
    if (!skill) {
      return res.status(404).json({ message: "Skill not found or not authorized" });
    }

    res.json({ message: "Skill deleted successfully", id });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete skill",
      error: error.message,
    });
  }
};
// 📌 Update a skill (only if it belongs to the logged-in user)
export const updateSkill = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;
    const updates = req.body;

    const skill = await Skill.findOneAndUpdate(
      { _id: id, userId },
      updates,
      { new: true } // return updated document
    );

    if (!skill) {
      return res.status(404).json({ message: "Skill not found or not authorized" });
    }

    res.json({ message: "Skill updated successfully", skill });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update skill",
      error: error.message,
    });
  }
};
export const getSkillById = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    const skill = await Skill.findOne({ _id: id, userId });
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch skill", error: error.message });
  }
};
