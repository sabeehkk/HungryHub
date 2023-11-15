import express from 'express'

import {
    signup,
    userLogin,
    googleLogin,
    verifySignup,
    verifyOtp
} from '../controller/user/AuthController.js'

import VerifyToken from '../middleware/jwtUserVerification.js'
const router =express.Router()

router.post('/register',signup)
router.post('/login',userLogin)
router.post('/googleLogin',googleLogin)
router.post('/signupVerify',verifySignup)
router.post('/verifyOtp',verifyOtp)


export default router   