import { Router } from "express"
import { deleteFlashcard, getAllFlashcards, getOneFlashcard, postFlashcard } from "../controllers/flashcardsController.js" 
import { validateBody, validateParams } from "../middleware/validation.js"
import { createFlashcardsSchema, flashcardIdSchema } from "../models/flashcards.js"
import { authenticateToken } from "../middleware/authenticateToken.js"

const router = Router()

router.use(authenticateToken)

router.get("/:id", validateParams(flashcardIdSchema), getOneFlashcard)
router.get("/", getAllFlashcards)
router.post("/", validateBody(createFlashcardsSchema), postFlashcard)
router.delete("/:id", validateParams(flashcardIdSchema), deleteFlashcard)



export default router