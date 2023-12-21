import express from 'express'

import {
    signup,
    login
} from '../controller/employee/AuthController.js'
import {getEmplOrders,listEmployees} from '../controller/employee/orderController.js'

const router =express.Router()

router.post('/register',signup)

router.post('/login',login)

router.get('/getordersempl', getEmplOrders)
router.get('/listEmployees',listEmployees)


export default router