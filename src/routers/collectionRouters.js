import {Router} from 'express'
import { collectionSchema } from '../models/collection.js'
import { validateBody, validateParams } from "../middleware/validation.js";
import { created, getAllCollections, getOneCollection, getMyCollections } from '../controllers/collectionController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';


const router = Router()

router.use(authenticateToken)

router.post('/', validateBody(collectionSchema), created)
router.get('/', getAllCollections)
router.get("/mycollections", getMyCollections)
router.get("/:id", validateParams(collectionSchema), getOneCollection)

export default router