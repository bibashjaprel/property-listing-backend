import { Router } from "express";
const router = Router();
import { createUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";

router.post("/register", createUser);
router.post("/login", loginUser);


export default router;
