import { db } from '../db/database.js';
import { accountTable } from '../db/schema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm'


/**
 * @param {request} req
 * @param  {response} res
 */
export const register = async(req, res) => {
    try {
        //Récupère les valeurs du body
        const { mail, firstname, lastname, nickname, password } = req.body;
        //Hash le mdp
        const pass = await bcrypt.hash(password, 10)

        //Vérifie si l'utilisateur existe déja
        const users = await db.select()
            .from(accountTable)
            .where(eq(accountTable.mail, mail))
            .limit(1);

        // Si le mail existe déja on renvoie une erreur
        if (users.length > 0) {
            return res.status(400).json({
                message: 'L\'email existe déjà.'
            });
        }

        //Insère le nouvel utilisateur
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
    
        //Créer le JWT Token
        const token = jwt.sign(
        { userId: newUser.id,
            nickname: newUser.nickname,
            mail: newUser.mail,
            firstname: newUser.firstname,
            lastname: newUser.lastname
         },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
        );

        //Retourne un bon message d'erreur
        res.status(200).json({
            message: 'User registered',
            userData: newUser,
            token
        })
    } catch(error){
        //On log l'erreur et on informe l'utilisateur
        console.error(error)
        res.status(500).json({
            error: 'Erreur : ' + error
        })
    }
}

export const login = async (req, res) => {
    //Récupère les identifiants du body
    const { mail, password } = req.body;

    //Cherche si un utilisateur avec ce nom existe
    const users = await db.select()
        .from(accountTable)
        .where(eq(accountTable.mail, mail))
        .limit(1);

    //Transforme le tableau en une valeur
    const user = users[0];

    //Si l'utilisateur n'existe pas
    if (!user) {
        return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    //Vérifie si le mdp de l'utilisateur est valide
    const isPasswordValid = await bcrypt.compare(password, user.pass);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "mot de passe incorrect" });
    }

    //Créer un jwt token
    const token = jwt.sign(
        { userId: user.id,
            nickname: user.nickname,
            mail: user.mail,
            firstname: user.firstname,
            lastname: user.lastname
         },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    //Retourne le token et les infos
    res.status(200).json({
        username: user.nickname,
        mail: user.eail,
        token
    });
};

/**
 * Récupère les informations du JWT.
 */
export const getJWTInformation = (req, res) => {
    try {
        // Récupérer l'en-tête Authorization
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ error: 'token manquant' });
        }

        //Retire le "bearer" au début pour décoder correctement
        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return res.status(200).json({
            message: 'Informations du JWT récupérées avec succès',
            data: decoded
        });

    } catch (error) {
        return res.status(500).json({ error: 'Erreur: ' + error.message });
    }
};