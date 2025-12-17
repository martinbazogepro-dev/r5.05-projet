import {Router} from 'express'
import { collectionSchema } from '../models/collection.js'
import { validateBody } from "../middleware/validation.js";
import { created, read } from '../controllers/collectionController.js';


const router = Router()

router.post('/create', validateBody(collectionSchema), created)
router.get('/', read)

export default router