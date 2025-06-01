import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createUser, loginUser, userProfile, updateUserProfile } from "../controllers/user.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operations related to user authentication and profile management
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 *   schemas:
 *     UserRegister:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           maxLength: 100
 *           description: Unique username for the user
 *           example: johndoe
 *         email:
 *           type: string
 *           maxLength: 150
 *           format: email
 *           description: Unique email address
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           format: password
 *           description: Secure user password
 *           example: StrongPassword123
 *         phone:
 *           type: string
 *           maxLength: 20
 *           description: Optional phone number
 *           example: "+9779800000000"
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: Optional role assigned to the user
 *           example: user
 *         profile_image:
 *           type: string
 *           format: uri
 *           description: Optional URL to the user's profile image
 *           example: "https://example.com/avatar.jpg"
 *
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: StrongPassword123
 *
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: johndoe
 *         email:
 *           type: string
 *           format: email
 *           example: johndoe@example.com
 *         phone:
 *           type: string
 *           example: "+9779800000000"
 *         role:
 *           type: string
 *           example: user
 *         profile_image:
 *           type: string
 *           format: uri
 *           example: "https://example.com/avatar.jpg"
 *         is_verified:
 *           type: boolean
 *           example: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2025-06-01T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2025-06-05T08:30:00Z"
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       description: New user details
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       400:
 *         description: Invalid input or user already exists
 */
router.post("/register", createUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user and receive a JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       description: User credentials for login
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get the current authenticated user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.get("/profile", authenticate, userProfile);


/**
 * @swagger
 * /api/users/profile:
 *   patch:
 *     summary: Update the authenticated user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Fields to update in user profile
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: newusername
 *               phone:
 *                 type: string
 *                 example: "+9779800001111"
 *               profile_image:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/new-avatar.jpg"
 *     responses:
 *       200:
 *         description: Profile successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.patch("/profile", authenticate, updateUserProfile);

export default router;
