// controllers/feed.controller.js
import User from "../models/User.js";
import Follower from "../models/Follower.model.js";

export const getFeed = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    // fetch all users except logged-in user
    const users = await User.find({ _id: { $ne: currentUserId } })
      .select("displayName avatar bio");

    // fetch all users current user is following
    const following = await Follower.find({ followerId: currentUserId })
      .select("userId");

    const followingIds = following.map((f) => f.userId.toString());

    // mark isFollowing
    const feed = users.map((user) => ({
      ...user.toObject(),
      isFollowing: followingIds.includes(user._id.toString()),
    }));

    res.json(feed);
  } catch (error) {
    console.error("Error fetching feed:", error);
    res.status(500).json({ message: "Server error" });
  }
};
