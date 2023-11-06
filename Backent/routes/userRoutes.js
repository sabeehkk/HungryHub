import express from 'express'

import {
    signup,
    userLogin,
    googleLogin

} from '../controller/user/AuthController.js'
import VerifyToken from '../middleware/jwtUserVerification.js'
const router =express.Router()

router.post('/register',signup)
router.post('/login',userLogin)
router.post('/googleLogin',googleLogin)
export default router   