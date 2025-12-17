import {Router} from 'express'
import { registerSchema, loginSchema } from '../models/auth.js'
import { validateBody } from "../middleware/validation.js";
import { login, register } from '../controllers/authsController.js';
import { adminVerificationToken, authenticateToken } from '../middleware/authenticateToken.js';
import { deleteOneUser, getAllusers, getOneUser } from '../controllers/adminController.js';


const router = Router()

router.use(adminVerificationToken)

//Vérification si admin censé etre bon
//Il manque a créer les routes admins et le controller pour ces routes
router.get('/users', getAllusers)
router.get('/users/:id', getOneUser)
router.delete('/users/:id', deleteOneUser)
export default router