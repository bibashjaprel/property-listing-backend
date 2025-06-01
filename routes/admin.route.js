import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeAdmin } from '../middlewares/admin.middleware.js';
import {
  getAllListingsForAdmin,
  updateAnyListing,
  deleteAnyListing,
} from '../controllers/admin.controller.js';

const router = Router();
/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Admin operations for managing listings
 * 
 * /api/admin/listings:
 *   get:
 *     summary: Get all listings (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all listings accessible by admin
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Listing'
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - admin access required
 *
 * /api/admin/listings/{id}:
 *   patch:
 *     summary: Update any listing by ID (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Listing ID to update
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
 *       403:
 *         description: Forbidden - admin access required
 *       404:
 *         description: Listing not found
 * 
 *   delete:
 *     summary: Delete any listing by ID (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Listing ID to delete
 *     responses:
 *       204:
 *         description: Listing deleted successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - admin access required
 *       404:
 *         description: Listing not found
 */

router.use(authenticate, authorizeAdmin);

router.get('/listings', getAllListingsForAdmin);
router.patch('/listings/:id', updateAnyListing);
router.delete('/listings/:id', deleteAnyListing);

export default router;
