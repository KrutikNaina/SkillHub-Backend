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

    // prepare feed with follower/following count + isFollowing
    const feed = await Promise.all(
      users.map(async (user) => {
        const userId = user._id.toString();

        // count followers and following for each user
        const followerCount = await Follower.countDocuments({ userId });
        const followingCount = await Follower.countDocuments({ followerId: userId });

        return {
          ...user.toObject(),
          isFollowing: followingIds.includes(userId),
          followerCount,
          followingCount,
        };
      })
    );

    res.json(feed);
  } catch (error) {
    console.error("Error fetching feed:", error);
    res.status(500).json({ message: "Server error" });
  }
};
