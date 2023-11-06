import express from 'express'

import {
    signup,
    login
} from '../controller/employee/AuthController.js'

const router =express.Router()

router.post('/register',signup)

router.post('/login',login)

export default router