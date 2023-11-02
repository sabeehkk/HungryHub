import express from 'express'

import {
    signup,
    userLogin

} from '../controller/user/AuthController.js'
import VerifyToken from '../middleware/jwtUserVerification.js'
const router =express.Router()

router.post('/register',signup)
router.post('/login',userLogin)
export default router   