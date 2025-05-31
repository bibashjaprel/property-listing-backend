import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = Router();
import { createUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { userProfile } from "../controllers/user.controller.js";

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/profile", authenticate, userProfile);


export default router;
