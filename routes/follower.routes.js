// backend/routes/followers.routes.js
import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import Follower from "../models/Follower.model.js";

const router = express.Router();

/**
 * POST /api/followers/follow
 * Follow a user
 */
router.post("/follow", authenticate, async (req, res) => {
  try {
    const { userId } = req.body; // user to follow
    const followerId = req.user._id; // current logged-in user from token

    if (userId.toString() === followerId.toString()) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    // Check if already following
    const alreadyFollowing = await Follower.findOne({ userId, followerId });
    if (alreadyFollowing) {
      return res.status(400).json({ message: "Already following this user" });
    }

    const follow = await Follower.create({ userId, followerId });
    res.status(201).json(follow);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/followers/unfollow
 * Unfollow a user
 */
router.delete("/unfollow", authenticate, async (req, res) => {
  try {
    const { userId } = req.body; // user to unfollow
    const followerId = req.user._id;

    const unfollow = await Follower.findOneAndDelete({ userId, followerId });
    if (!unfollow) {
      return res.status(404).json({ message: "You are not following this user" });
    }

    res.json({ message: "Unfollowed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/followers/:userId
 * Get followers of a user
 */
router.get("/:userId", authenticate, async (req, res) => {
  try {
    const followers = await Follower.find({ userId: req.params.userId })
      .populate("followerId", "displayName bio avatar")
      .lean();

    res.json(followers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
