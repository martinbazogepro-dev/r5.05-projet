import { db } from '../db/database.js';
import { collectionTable } from '../db/schema.js'

/**
 * @param {request} req
 * @param  {response} res
 */
export const created = async(req, res) => {
    try {
        const { title, description, is_public, owner_id } = req.body;

        const [newCollection] = await db.insert(collectionTable).values({
            title,
            description,
            is_public,
            owner_id
        }).returning({
            id: collectionTableTable.id,
            title: collectionTableTable.title            
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


export const read = async (req, res) => {
    try {
        const [readCollection] = await db.read(collectionTable);
        res.status(200).json({
            message: 'Collection',
            userData: readCollection
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Erreur : ' + error.message
        });
    }
};
