import {Router} from 'express'
import { collectionSchema } from '../models/collection.js'
import { validateBody, validateParams } from "../middleware/validation.js";

import {
    created, getAllCollections, getOneCollection, getMyCollections, getPublicCollectionsByTitle,
    modifyCollectionTitle, modifyCollectionDescription, modifyCollectionVisibility, deleteCollection
} from '../controllers/collectionController.js';

import { authenticateToken } from '../middleware/authenticateToken.js';


const router = Router()

router.use(authenticateToken)

router.post('/', validateBody(collectionSchema), created)
router.get('/', getAllCollections)
router.get("/mycollections", getMyCollections)
router.get("/:id", validateParams(collectionSchema), getOneCollection)
router.get("/getbytitle/:title", validateParams(collectionSchema), getPublicCollectionsByTitle)
router.put("/:id/modifytitle/:title", validateParams(collectionSchema), modifyCollectionTitle)
router.put("/:id/modifydescription/:description", validateParams(collectionSchema), modifyCollectionDescription)
router.put("/:id/modifyvisibility/:isPublic", validateParams(collectionSchema), modifyCollectionVisibility)
router.delete("/:id", validateParams(collectionSchema), deleteCollection)


export default router