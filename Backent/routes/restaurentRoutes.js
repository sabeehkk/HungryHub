import express from 'express'

import {
    signup,
    login,
} from '../controller/restaurent/AuthControlle.js'
import {
    // ProductAdd,
    ProductList,
    addProduct,
    addCategory

}from '../controller/restaurent/restaurentController.js'

const router =express.Router()

router.post('/register',signup)  
router.post('/login',login)
// router.post('/addFood',ProductAdd)
router.get('/productList',ProductList)
router.post('/addProduct',addProduct)
router.post('/addCategory',addCategory)

export default router