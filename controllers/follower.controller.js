import Follower from '../models/Follower.model.js';

// Follow a user
export const followUser = async (req, res) => {
  try {
    const { userId } = req.body; // person being followed
    const followerId = req.user._id; // logged-in user from JWT

    if (userId.toString() === followerId.toString()) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    // Prevent duplicate follows
    const alreadyFollowing = await Follower.findOne({ userId, followerId });
    if (alreadyFollowing) {
      return res.status(400).json({ message: 'Already following this user' });
    }

    const follow = await Follower.create({ userId, followerId });
    res.status(201).json(follow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const followerId = req.user._id;

    const unfollow = await Follower.findOneAndDelete({ userId, followerId });
    if (!unfollow) {
      return res.status(404).json({ message: 'Not following this user' });
    }

    res.status(200).json({ message: 'Unfollowed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get followers of a user
export const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;

    const followers = await Follower.find({ userId })
      .populate('followerId', 'displayName email avatar');
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get users followed by a user
export const getFollowing = async (req, res) => {
  try {
    const { followerId } = req.params;

    const following = await Follower.find({ followerId })
      .populate('userId', 'displayName email avatar');
    res.status(200).json(following);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ NEW: Get counts of followers & following
export const getFollowCounts = async (req, res) => {
  try {
    const { userId } = req.params;

    const followersCount = await Follower.countDocuments({ userId });
    const followingCount = await Follower.countDocuments({ followerId: userId });

    res.status(200).json({ followersCount, followingCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
