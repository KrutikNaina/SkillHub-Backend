import User from "../models/User.js";

export const getFeed = async (req, res) => {
  try {
    // exclude the current logged-in user
    const users = await User.find({ _id: { $ne: req.user._id } })
      .select("displayName avatar bio");

    res.json(users);
  } catch (error) {
    console.error("Error fetching feed:", error);
    res.status(500).json({ message: "Server error" });
  }
};
