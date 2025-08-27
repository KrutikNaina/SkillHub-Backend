import express from 'express';
import { followUser, unfollowUser, getFollowers, getFollowing } from '../controllers/follower.controller.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/follow', authenticate, followUser);
router.post('/unfollow', authenticate, unfollowUser);
router.get('/:userId/followers', authenticate, getFollowers);
router.get('/:followerId/following', authenticate, getFollowing);

export default router;
