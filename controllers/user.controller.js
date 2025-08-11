// controllers/user.controller.js
import User from "../models/User.js"; // Import your User model

export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id; // assuming auth middleware sets req.user
    const user = await User.findById(userId).select("-__v");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true, runValidators: true }
    ).select("-__v");

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};
