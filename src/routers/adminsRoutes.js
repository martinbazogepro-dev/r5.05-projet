import {Router} from 'express'
import { registerSchema, loginSchema } from '../models/auth.js'
import { validateBody } from "../middleware/validation.js";
import { login, register } from '../controllers/authsController.js';
import { adminVerificationToken, authenticateToken } from '../middleware/authenticateToken.js';
import { deleteOneUser, getAllusers, getOneUser } from '../controllers/adminController.js';


const router = Router()

router.use(adminVerificationToken)

//Vérification si admin censé etre bon
//Il manque a créer les routes admins et le controller pour ces routes

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Routes réservées aux administrateurs
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *       403:
 *         description: Accès refusé (non admin)
 */
router.get('/users', getAllusers)

/**
* @swagger
* /admin/users/{id}:
*   get:
*     summary: Récupérer un utilisateur par ID
*     tags: [Admin]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Utilisateur trouvé
*       403:
*         description: Accès refusé
*       404:
*         description: Utilisateur non trouvé
*/
router.get('/users/:id', getOneUser)

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       403:
 *         description: Accès refusé
 */
router.delete('/users/:id', deleteOneUser)
export default router