// controllers/feed.controller.js
import User from "../models/User.js";
import Follower from "../models/Follower.model.js";

export const getFeed = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Get all other users
    const users = await User.find({ _id: { $ne: loggedInUserId } })
      .select("displayName avatar bio");

    // Followers of loggedInUser (to know who he follows)
    const myFollowings = await Follower.find({ followerId: loggedInUserId }).select("userId");

    // Map for quick lookup
    const followingSet = new Set(myFollowings.map(f => f.userId.toString()));

    // For each user, count followers & following
    const enrichedUsers = await Promise.all(
      users.map(async (user) => {
        const followersCount = await Follower.countDocuments({ userId: user._id });
        const followingCount = await Follower.countDocuments({ followerId: user._id });

        return {
          ...user.toObject(),
          followersCount,
          followingCount,
          isFollowing: followingSet.has(user._id.toString()),
        };
      })
    );

    res.json(enrichedUsers);
  } catch (error) {
    console.error("Error fetching feed:", error);
    res.status(500).json({ message: "Server error" });
  }
};
