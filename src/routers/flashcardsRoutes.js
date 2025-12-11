import { Router } from "express"
import { validateBody, validateParams } from "../middleware/validation"
import { createFlashcardsSchema, flashcardIdSchema } from "../models/flashcards"
import { authenticateToken } from "../middleware/authenticateToken.js"

const router = Router()

router.use(authenticateToken)

router.get("/:id", validateParams(flashcardIdSchema), getOneFlashcard)
router.get("/", getAllFlashcards)
router.post("/", validateBody(createFlashcardsSchema), postFlashcard)
router.delete("/:id", validateParams(flashcardIdSchema), deleteFlashcard)



export default router