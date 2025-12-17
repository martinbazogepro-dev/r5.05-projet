import {Router} from 'express'
import { registerSchema, loginSchema } from '../models/auth.js'
import { validateBody } from "../middleware/validation.js";
import { login, register } from '../controllers/authsController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';


const router = Router()

//router.use(authenticateToken)

router.post('/register', validateBody(registerSchema), register)
router.post('/login', validateBody(loginSchema), login)

export default router