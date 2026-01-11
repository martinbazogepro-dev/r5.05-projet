import {Router} from 'express'
import { registerSchema, loginSchema } from '../models/auth.js'
import { validateBody } from "../middleware/validation.js";
import { getJWTInformation, login, register } from '../controllers/authsController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';


const router = Router()

//router.use(authenticateToken)

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscription utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAuth'
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */
router.post('/register', validateBody(registerSchema), register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAuth'
 *     responses:
 *       200:
 *         description: JWT retourné
 */
router.post('/login', validateBody(loginSchema), login)

/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Récupérer les informations du JWT
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informations utilisateur
 */
router.get('/', getJWTInformation)

export default router