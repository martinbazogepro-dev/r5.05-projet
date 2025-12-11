import { db } from '../db/database.js';
import { accountTable } from '../db/schema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

/**
 * @param {request} req
 * @param  {response} res
 */
export const register = async(req, res) => {
    try {
        const { mail, firstname, lastname, nickname, password } = req.body;
        const pass = await bcrypt.hash(password, 10)

        const [newUser] = await db.insert(accountTable).values({
            mail,
            nickname,
            firstname,
            lastname,
            pass
        }).returning({
            mail: accountTable.mail,
            nickname: accountTable.nickname,
            id: accountTable.id
        })
    
        const token = jwt.sign(
            { userId: newUser.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200).json({
            message: 'User registered',
            userData: newUser,
            token
        })
    } catch(error){
        console.error(error)
        res.status(500).json({
            error: 'Erreur : ' + error
        })
    }
}

