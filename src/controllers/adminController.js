import { desc, eq } from "drizzle-orm"
import { db } from "../db/database.js"
import { accountTable } from "../db/schema.js"
import { request } from "express"

/**
 * @param {request} req
 * @param  {response} res
 */
export const getAllusers = async(req, res) => {

    //Vérifie si l'utilisateur existe déja
    const users = await db.select()
        .from(accountTable)
        .orderBy(desc(accountTable.creationDate))

    //Retourne un bon message d'erreur
    res.status(200).json({
        users
    })

}

export const getOneUser = async(req, res) => {
    const { id } = req.params

    try{
        let user = await db.select()
            .from(accountTable)
            .where(eq(accountTable.id, id))
            .limit(1);

        user = user[0]

        if(!user){
            throw new Error("Aucun compte trouvé")
        }
        
        res.status(200).json({
            user
        })

    } catch(erreur){
        res.status(500).json({
            error: 'Erreur : ' + erreur.message
        })
    }

}