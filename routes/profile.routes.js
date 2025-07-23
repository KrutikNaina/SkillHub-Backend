import express from 'express';
import { createProfile } from '../controllers/profile.controller.js';

const router = express.Router();

router.post('/', createProfile); // POST /api/profiles

export default router;
