import { Router } from "express";
import { getListing, createListing, singleListing, updateListing, deleteListing } from "../controllers/listing.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/", getListing);
router.get("/:id", singleListing);
router.post("/", authenticate, createListing);
router.patch("/:id", authenticate, updateListing);
router.delete("/:id", authenticate, deleteListing);


export default router;
