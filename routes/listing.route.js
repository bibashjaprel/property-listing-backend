import { Router } from "express";
import { getListing, createListing, singleListing } from "../controllers/listing.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/", getListing);
router.get("/:id", singleListing);
router.post("/", authenticate, createListing);

export default router;
