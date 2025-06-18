import { Router } from "express";
import { getListing, createListing, singleListing, updateListing, deleteListing } from "../controllers/listing.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Listings
 *     description: Real estate listings management
 * 
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         city:
 *           type: string
 *           example: Kathmandu
 *         street:
 *           type: string
 *           example: Lazimpat
 *         house_no:
 *           type: string
 *           example: 45A
 * 
 *     Features:
 *       type: object
 *       properties:
 *         parking:
 *           type: boolean
 *           example: true
 *         balcony:
 *           type: boolean
 *           example: true
 *         furnished:
 *           type: boolean
 *           example: false
 * 
 *     Listing:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1001
 *         title:
 *           type: string
 *           example: "3 BHK Apartment in Jawalakel"
 *         description:
 *           type: string
 *           example: "Spacious 3 bedroom apartment in Lazimpat"
 *         category:
 *           type: string
 *           example: "apartment"
 *         price:
 *           type: number
 *           example: 15000000
 *         price_type:
 *           type: string
 *           example: "monthly"
 *         address:
 *           $ref: '#/components/schemas/Address'
 *         latitude:
 *           type: number
 *           format: float
 *           example: 27.7172
 *         longitude:
 *           type: number
 *           format: float
 *           example: 85.324
 *         features:
 *           $ref: '#/components/schemas/Features'
 *         expires_at:
 *           type: string
 *           format: date-time
 *           example: "2025-12-31T23:59:59Z"
 */

/**
 * @swagger
 * /api/listings:
 *   get:
 *     summary: Get all listings (with pagination)
 *     tags: [Listings]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 9
 *         description: Number of listings per page
 *     responses:
 *       200:
 *         description: Paginated list of real estate listings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listings:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Listing'
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalCount:
 *                   type: integer
 *                   example: 45
 *       500:
 *         description: Server error while fetching listings
 * 
 *   post:
 *     summary: Create a new listing
 *     tags: [Listings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Listing details to create
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Listing'
 *     responses:
 *       201:
 *         description: Listing created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Listing'
 *       401:
 *         description: Unauthorized - missing or invalid token
 */


/**
 * @swagger
 * /api/listings/{id}:
 *   get:
 *     summary: Get a single listing by ID
 *     tags: [Listings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Listing ID
 *     responses:
 *       200:
 *         description: Listing details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Listing'
 *       404:
 *         description: Listing not found
 * 
 *   patch:
 *     summary: Update a listing by ID
 *     tags: [Listings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Listing ID
 *     requestBody:
 *       required: true
 *       description: Updated listing data
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Listing'
 *     responses:
 *       200:
 *         description: Listing updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Listing'
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: Listing not found
 * 
 *   delete:
 *     summary: Delete a listing by ID
 *     tags: [Listings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Listing ID
 *     responses:
 *       204:
 *         description: Listing deleted successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: Listing not found
 */

router.get("/", getListing);
router.get("/:id", singleListing);
router.post("/", authenticate, createListing);
router.patch("/:id", authenticate, updateListing);
router.delete("/:id", authenticate, deleteListing);

export default router;
