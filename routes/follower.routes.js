import express from 'express';
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from '../controllers/follower.controller.js';

const router = express.Router();

router.post('/follow', followUser);
router.delete('/unfollow', unfollowUser);
router.get('/followers/:userId', getFollowers);
router.get('/following/:followerId', getFollowing);

export default router;
