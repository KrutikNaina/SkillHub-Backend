import Skill from "../models/skill.model.js";

// 📌 Create a new skill
export const createSkill = async (req, res) => {
  try {
    const { title, description, coverImage, startDate, targetGoal } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

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
    console.error("Create skill error:", error);
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
    console.error("Get skills error:", error);
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
    console.error("Get user skills error:", error);
    res.status(500).json({
      message: "Failed to fetch user skills",
      error: error.message,
    });
  }
};

// 📌 Get skills count for the logged-in user
export const getSkillsCount = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const count = await Skill.countDocuments({ userId });
    res.status(200).json({ count });
  } catch (error) {
    console.error("Get skills count error:", error);
    res.status(500).json({
      message: "Failed to fetch skills count",
      error: error.message,
    });
  }
};

// 📌 Delete a skill by ID
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
    console.error("Delete skill error:", error);
    res.status(500).json({
      message: "Failed to delete skill",
      error: error.message,
    });
  }
};

// 📌 Update a skill
export const updateSkill = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;
    const updates = req.body;

    const skill = await Skill.findOneAndUpdate(
      { _id: id, userId },
      updates,
      { new: true }
    );

    if (!skill) {
      return res.status(404).json({ message: "Skill not found or not authorized" });
    }

    res.json({ message: "Skill updated successfully", skill });
  } catch (error) {
    console.error("Update skill error:", error);
    res.status(500).json({
      message: "Failed to update skill",
      error: error.message,
    });
  }
};

// 📌 Get a skill by ID
export const getSkillById = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    const skill = await Skill.findOne({ _id: id, userId });
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    res.json(skill);
  } catch (error) {
    console.error("Get skill by ID error:", error);
    res.status(500).json({ message: "Failed to fetch skill", error: error.message });
  }
};
// 📌 Get last 3 recent skills of logged-in user
export const getRecentSkills = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const recentSkills = await Skill.find({ userId })
      .sort({ createdAt: -1 }) // newest first
      .limit(3);

    res.status(200).json(recentSkills);
  } catch (error) {
    console.error("Get recent skills error:", error);
    res.status(500).json({
      message: "Failed to fetch recent skills",
      error: error.message,
    });
  }
};
