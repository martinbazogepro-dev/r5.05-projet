import {Router} from 'express'
import { registerSchema, loginSchema } from '../models/auth.js'
import { validateBody } from "../middleware/validation.js";
import { login, register } from '../controllers/authsController.js';
import { adminVerificationToken, authenticateToken } from '../middleware/authenticateToken.js';


const router = Router()

router.use(adminVerificationToken)

//Vérification si admin censé etre bon
//Il manque a créer les routes admins et le controller pour ces routes
router.post('/register', validateBody(registerSchema), register)
router.post('/login', validateBody(loginSchema), login)

export default router