import express from 'express'

import {
    signup
} from '../controller/restaurent/signup.js'

const router =express.Router()

router.post('/register',signup)  
export default router