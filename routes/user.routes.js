// routes/user.routes.js
import express from "express";
import { getMyProfile, updateProfile } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.get("/me", authenticate, getMyProfile);
router.put("/me", authenticate, updateProfile);

export default router;
