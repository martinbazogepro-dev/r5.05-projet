import {Router} from 'express'
import { collectionSchema } from '../models/collection.js'
import { validateBody } from "../middleware/validation.js";
import { created, read } from '../controllers/collectionController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';


const router = Router()

router.use(authenticateToken)

router.post('/', validateBody(collectionSchema), created)
router.get('/', read)

export default router