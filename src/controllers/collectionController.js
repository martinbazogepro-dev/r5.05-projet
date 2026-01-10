import { eq } from "drizzle-orm"
import { db } from '../db/database.js';
import { collectionTable } from '../db/schema.js'

/**
 * @param {request} req
 * @param  {response} res
 */
export const created = async(req, res) => {
    try {
        const { title, description, is_public } = req.body;
        const ownerId = req.userId.userId;
        const [newCollection] = await db.insert(collectionTable).values({
            title,
            description,
            is_public,
            ownerId
        }).returning({
            id: collectionTable.id,
            title: collectionTable.title            
        })

        res.status(200).json({
            message: 'collection created',
            userData: newCollection
        })
    } catch(error){
        console.error(error)
        res.status(500).json({
            error: 'Erreur : ' + error
        })
    }
}


export const getAllCollections = async (req, res) => {
    try {
        const [readCollection] =await db.select().from(collectionTable);
        res.status(200).json({
            message: 'Collection',
            userData: readCollection
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Erreur attention message : ' + error.message
        });
    }
};

export const getOneCollection = async (request, response) => {
    const { id } = request.params
    
    try {
        const [collection] = await db.select().from(collectionTable).where(eq(collectionTable.id, id))

        if (!collection) {
            return response.status(404).json({
                error: "Collection non trouvée",
            })
        }

        const userId = request.userId.userId

        if ((!userId) || (userId != collection.ownerId && !collection.isPublic)) {
            return response.status(403).json({
                error: "Non autorisé",
            })
        }

        response.status(200).json({
            message: "Collection trouvée",
            data: collection,
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Pas réussi à obtenir la collection",
        })
    }
}

export const getMyCollections = async (request, response) => {
    try {
        const userId = request.userId.userId
        const [collection] = await db.select().from(collectionTable).where(eq(collectionTable.ownerId, userId))

        if (!collection) {
            return response.status(404).json({
                error: "Collections non trouvées",
            })
        }

        response.status(200).json({
            message: "Collections trouvées",
            data: collection,
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Pas réussi à obtenir les collections",
        })
    }
}

export const getPublicCollectionsByTitle = async (request, response) => {
    const { title } = request.params

    try {
        const [collection] = await db.select().from(collectionTable).where(eq(collectionTable.title, title), collectionTable.isPublic)

        if (!collection) {
            return response.status(404).json({
                error: "Collections non trouvées",
            })
        }

        response.status(200).json({
            message: "Collections trouvées",
            data: collection,
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Pas réussi à obtenir les collections",
        })
    }
}

export const modifyCollectionTitle = async (request, response) => {
    const { id, title } = request.params

    try {
        const userId = request.userId.userId
        const [collectionToUpdate] = await db.select().from(collectionTable).where(eq(collectionTable.id, id))

        if (!collectionToUpdate) {
            return response.status(404).json({
                error: "Collection non trouvée",
            })
        }

        if (collectionToUpdate.ownerId != userId) {
            return response.status(403).json({
                error: "Non autorisé",
            })
        }

        await db.update(collectionTable).set({ title: title }).where(eq(collectionTable.id, id))
        const [updatedCollection] = await db.select().from(collectionTable).where(eq(collectionTable.id, id))

        response.status(200).json({
            message: "Collection mise à jour",
            data: updatedCollection,
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Pas réussi à mettre à jour la collection",
        })
    }
}

export const modifyCollectionDescription = async (request, response) => {
    const { id, description } = request.params

    try {
        const userId = request.userId.userId
        const [collectionToUpdate] = await db.select().from(collectionTable).where(eq(collectionTable.id, id))

        if (!collectionToUpdate) {
            return response.status(404).json({
                error: "Collection non trouvée",
            })
        }

        if (collectionToUpdate.ownerId != userId) {
            return response.status(403).json({
                error: "Non autorisé",
            })
        }

        await db.update(collectionTable).set({ description: description }).where(eq(collectionTable.id, id))
        const [updatedCollection] = await db.select().from(collectionTable).where(eq(collectionTable.id, id))

        response.status(200).json({
            message: "Collection mise à jour",
            data: updatedCollection,
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Pas réussi à mettre à jour la collection",
        })
    }
}

export const modifyCollectionVisibility = async (request, response) => {
    const { id, isPublic } = request.params

    try {
        const userId = request.userId.userId
        const [collectionToUpdate] = await db.select().from(collectionTable).where(eq(collectionTable.id, id))

        if (!collectionToUpdate) {
            return response.status(404).json({
                error: "Collection non trouvée",
            })
        }

        if (collectionToUpdate.ownerId != userId) {
            return response.status(403).json({
                error: "Non autorisé",
            })
        }

        await db.update(collectionTable).set({ isPublic: isPublic }).where(eq(collectionTable.id, id))
        const [updatedCollection] = await db.select().from(collectionTable).where(eq(collectionTable.id, id))

        response.status(200).json({
            message: "Collection mise à jour",
            data: updatedCollection,
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Pas réussi à mettre à jour la collection",
        })
    }
}
