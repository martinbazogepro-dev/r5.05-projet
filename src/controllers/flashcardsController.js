import { eq } from "drizzle-orm"
import { db } from "../db/database.js"
import { collectionTable, flashcardTable } from "../db/schema.js"


export const getAllFlashcards = async (request, response) => {
    try {
        const flashcards = await db.select().from(flashcardTable).orderBy("id", "asc")
        response.status(200).json(flashcards)
    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Pas réussi à obtenir les flashcards"
        })
    }
}


export const postFlashcard = async (request, response) => {
    const { collectionId } = request.body

    try {
        const flashcard = request.body
        const userId = request.userId.userId

        console.log(collectionId)
        console.log(request.body)

        const [parentCollection] = await db.select().from(collectionTable).where(eq(collectionTable.id, collectionId))

        console.log(parentCollection)

        if (userId != parentCollection.ownerId) {
            return response.status(403).json({
                error: "Non autorisé",
            })
        }

        const [createdFlashcard] = await db.insert(flashcardTable).values(flashcard).returning()
        
        response.status(201).json({
            message: "Flashcard créée",
            data: createdFlashcard,
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Pas réussi à créer la flashcard",
        })
    }
}


export const deleteFlashcard = async (request, response) => {
    const { id } = request.params

    try {
        const userId = request.userId.userId

        const [flashcardToDelete] = await db.select().from(flashcardTable).where(eq(flashcardTable.id, id))
        const [parentCollection] = await db.select().from(collectionTable).where(eq(collectionTable.id, flashcardToDelete.collectionId))

        if (userId != parentCollection.ownerId) {
            return response.status(403).json({
                error: "Non autorisé",
            })
        }

        const [deletedFlashcard] = await db.delete(flashcardTable).where(eq(flashcardTable.id, id)).returning()
        if (!deletedFlashcard) {
            return response.status(404).json({
                error: "flashcard non trouvée",
            })
        }

        response.status(200).json({
            message: "Flashcard supprimée",
            data: deletedFlashcard,
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Pas réussi à supprimer la flashcard"
        })
    }
}


export const getOneFlashcard = async (request, response) => {
    const { id } = request.params
    
    try {
        const [flashcard ] = await db.select().from(flashcardTable).where(eq(flashcardTable.id, id))

        if (!flashcard) {
            return response.status(404).json({
                error: "Flashcard non trouvée",
            })
        }

        response.status(200).json({
            message: "Flashcard trouvée",
            data: flashcard,
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Pas réussi à obtenir la flashcard",
        })
    }
}
