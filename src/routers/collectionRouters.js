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


/**
 * @swagger
 * tags:
 *   name: Collections
 *   description: Gestion des collections
 */

/**
 * @swagger
 * /collections:
 *   post:
 *     summary: Créer une collection
 *     tags: [Collections]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Collection'
 *     responses:
 *       201:
 *         description: Collection créée
 */
router.post('/', validateBody(collectionSchema), created)

/**
 * @swagger
 * /collections:
 *   get:
 *     summary: Récupérer toutes les collections
 *     tags: [Collections]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des collections
 */
router.get('/', getAllCollections)

/**
 * @swagger
 * /collections/mycollections:
 *   get:
 *     summary: Récupérer mes collections
 *     tags: [Collections]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Collections de l'utilisateur connecté
 */
router.get("/mycollections", getMyCollections)

/**
 * @swagger
 * /collections/{id}:
 *   get:
 *     summary: Récupérer une collection par ID
 *     tags: [Collections]
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
 *         description: Collection trouvée
 */
router.get("/:id", validateParams(collectionSchema), getOneCollection)

/**
 * @swagger
 * /collections/getbytitle/{title}:
 *   get:
 *     summary: Rechercher des collections publiques par titre
 *     tags: [Collections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Collections trouvées
 */
router.get("/getbytitle/:title", validateParams(collectionSchema), getPublicCollectionsByTitle)

/**
 * @swagger
 * /collections/{id}/modifytitle/{title}:
 *   put:
 *     summary: Modifier le titre d'une collection
 *     tags: [Collections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Titre modifié
 */
router.put("/:id/modifytitle/:title", validateParams(collectionSchema), modifyCollectionTitle)

/**
 * @swagger
 * /collections/{id}/modifydescription/{description}:
 *   put:
 *     summary: Modifier la description d'une collection
 *     tags: [Collections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *       - in: path
 *         name: description
 *         required: true
 *     responses:
 *       200:
 *         description: Description modifiée
 */
router.put("/:id/modifydescription/:description", validateParams(collectionSchema), modifyCollectionDescription)

/**
 * @swagger
 * /collections/{id}/modifyvisibility/{isPublic}:
 *   put:
 *     summary: Modifier la visibilité d'une collection
 *     tags: [Collections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *       - in: path
 *         name: isPublic
 *         required: true
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Visibilité modifiée
 */
router.put("/:id/modifyvisibility/:isPublic", validateParams(collectionSchema), modifyCollectionVisibility)

/**
 * @swagger
 * /collections/{id}:
 *   delete:
 *     summary: Supprimer une collection
 *     tags: [Collections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Collection supprimée
 */
router.delete("/:id", validateParams(collectionSchema), deleteCollection)


export default router