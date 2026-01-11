import {Router} from 'express'
import { authenticateToken } from '../middleware/authenticateToken.js';
import { postRevision } from '../controllers/revisionController.js';
import { validateParams, validateBody } from "../middleware/validation.js"
import { flashcardIdSchema } from "../models/flashcards.js"


const router = Router()

router.use(authenticateToken)

/**
 * @swagger
 * tags:
 *   name: Revision
 *   description: Révisions des flashcards
 */

/**
 * @swagger
 * /revision/{id}:
 *   post:
 *     summary: Réviser une flashcard
 *     tags: [Revision]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Révision enregistrée
 */
router.post('/:id', validateParams(flashcardIdSchema), postRevision)


export default router