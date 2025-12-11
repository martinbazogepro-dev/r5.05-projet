import {Router} from 'express'
import { collectionSchema } from '../models/collection.js'
import { validateBody } from "../middleware/validation.js";
import { created, read } from '../controllers/collectionController.js';


const router = Router()

router.post('/collection', validateBody(collectionSchema), created)
router.get('/collection', read)

export default router