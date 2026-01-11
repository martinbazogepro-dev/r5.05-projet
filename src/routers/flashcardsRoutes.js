import { Router } from "express"
import { deleteFlashcard, getAllFlashcards, getOneFlashcard, postFlashcard } from "../controllers/flashcardsController.js" 
import { validateBody, validateParams } from "../middleware/validation.js"
import { createFlashcardsSchema, flashcardIdSchema } from "../models/flashcards.js"
import { authenticateToken } from "../middleware/authenticateToken.js"

const router = Router()

router.use(authenticateToken)

/**
 * @swagger
 * tags:
 *   name: Flashcards
 *   description: Gestion des flashcards
 */

/**
 * @swagger
 * /flashcards:
 *   get:
 *     summary: Récupérer toutes les flashcards
 *     tags: [Flashcards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des flashcards
 */
router.get("/", getAllFlashcards)


/**
 * @swagger
 * /flashcards/{id}:
 *   get:
 *     summary: Récupérer une flashcard
 *     tags: [Flashcards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Flashcard trouvée
 */
router.get("/:id", validateParams(flashcardIdSchema), getOneFlashcard)

/**
 * @swagger
 * /flashcards:
 *   post:
 *     summary: Créer une flashcard
 *     tags: [Flashcards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FlashcardCreate'
 *     responses:
 *       201:
 *         description: Flashcard créée
 */
router.post("/", validateBody(createFlashcardsSchema), postFlashcard)

/**
 * @swagger
 * /flashcards/{id}:
 *   delete:
 *     summary: Supprimer une flashcard
 *     tags: [Flashcards]
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
 *         description: Flashcard supprimée
 */
router.delete("/:id", validateParams(flashcardIdSchema), deleteFlashcard)

export default router