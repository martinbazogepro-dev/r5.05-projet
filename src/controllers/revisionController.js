import { and, eq } from "drizzle-orm"
import { db } from "../db/database.js"
import { collectionTable, flashcardTable, nextRevisionDateTable } from "../db/schema.js"


export const postRevision = async (request, response) => {

    try {
        //Id de la flashcard
        const { id: flashcardId } = request.params
        //Id de l'utilisateur
        const userId = request.userId.userId

        //On cherche une flashcard avec l'id du parametre de l'url
        const [flashcard] = await db.select().from(flashcardTable).where(eq(flashcardTable.id, flashcardId))

        //Si rien trouvé on quitte
        if (!flashcard) {
            return response.status(404).json({ error: "Flashcard non trouvée" })
        }

        //Cherche la collection de la flashcard
        const [parentCollection] = await db.select().from(collectionTable).where(eq(collectionTable.id, flashcard.collectionId))

        //Si rien trouvé on quitte
        if (!parentCollection) {
            return response.status(404).json({ error: "Collection non trouvée" })
        }
        //Si l'utilisateur n'est pas le propriétaire, on quitte
        if (userId !== parentCollection.ownerId) {
            return response.status(403).json({ error: "Non autorisé" })
        }

        // Cherche si une révision existe déjà
        const [existingRevision] = await db
            .select()
            .from(nextRevisionDateTable)
            .where(and(
                eq(nextRevisionDateTable.accountId, userId),
                eq(nextRevisionDateTable.flashcardId, flashcardId),
            ))

        const now = new Date()

        //Si ca existe déja, on mets juste a jour
        if (existingRevision) {

            //On augmente le niveau de la carte
            let nextLevel = existingRevision.level;

            if (nextLevel > 5) {
                nextLevel = 5;
            }

            //On récupère le délai en jours selon le niveau
            let delayDays
            switch (nextLevel) {
                case 1: delayDays = 1; break
                case 2: delayDays = 2; break
                case 3: delayDays = 4; break
                case 4: delayDays = 8; break
                case 5: delayDays = 16; break
                default: delayDays = 1; break
            }
            //Calcule la prochaine date de révision
            const nextRevisionDate = new Date(now.getTime() + delayDays * 24 * 60 * 60 * 1000)

            //Mets à jour
            const [updatedRevision] = await db
                .update(nextRevisionDateTable)
                .set({
                    level: nextLevel,
                    lastRevisionDate: now,
                    nextRevisionDate,
                })
                .where(eq(nextRevisionDateTable.id, existingRevision.id))
                .returning()

            return response.status(200).json({
                message: "Révision mise à jour",
                data: updatedRevision,
            })
        }

        // 3) Sinon on crée
        const level = 1
        let delayDays
        switch (level) {
            case 1: delayDays = 1; break
            case 2: delayDays = 2; break
            case 3: delayDays = 4; break
            case 4: delayDays = 8; break
            case 5: delayDays = 16; break
            default: delayDays = 1; break
        }
        const nextRevisionDate = new Date(now.getTime() + delayDays * 24 * 60 * 60 * 1000)

        //On insère
        const [createdRevision] = await db.insert(nextRevisionDateTable).values({
            accountId: userId,
            flashcardId,
            level,
            lastRevisionDate: now,
            nextRevisionDate,
        }).returning()

        return response.status(201).json({
            message: "Révision créée",
            data: createdRevision,
        })
    }
    catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Erreur : " + error,
        })
    }
}
