import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createUser, loginUser, userProfile, updateUserProfile } from "../controllers/user.controller.js";
import upload from '../middlewares/upload.middleware.js';

const router = Router();
// router.post("/register", createUser);
router.post("/register", upload.single('profile_image'), createUser);
router.post("/login", loginUser);
router.get("/profile", authenticate, userProfile);
router.patch("/profile", authenticate, updateUserProfile);

export default router;
