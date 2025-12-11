import { request } from "express"
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { adminTable } from "../db/schema"

/**
 * 
 * @param {request} req 
 * @param {*} res 
 * @param {*} next 
 */
export const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]

        if(!token){
            return res.status(401).json({error:'Token is required'})
        }


        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodeToken.userId
        req.userId = { userId }
        next()
    } catch(error){
        res.status(401).json({error:'Chalut'})

    }
}

export const adminVerificationToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]

        if(!token){
            return res.status(401).json({error:'Token is required'})
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodeToken.userId
        
        //Vérifie si l'utilisateur existe déja
        const users = await db.select()
            .from(adminTable)
            .where(eq(adminTable.accountId, userId))
            .limit(1);

        if(users.length < 1){
            throw new Error("Vous n'avez pas les droits nécéssaires")
        }

        next()
        } catch(error){
            res.status(401).json({error:'Chalut'})

        }
}