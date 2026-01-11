import {Router} from 'express'
import { authenticateToken } from '../middleware/authenticateToken.js';
import { postRevision } from '../controllers/revisionController.js';
import { validateParams, validateBody } from "../middleware/validation.js"
import { flashcardIdSchema } from "../models/flashcards.js"


const router = Router()

router.use(authenticateToken)

router.post('/:id', validateParams(flashcardIdSchema), postRevision)


export default router