import { Router } from "express";
import { getListing, createListing } from "../controllers/listing.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/", getListing);
router.post("/", authenticate, createListing);

export default router;
