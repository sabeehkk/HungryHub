import express from 'express'

import {
    signup,
    login,
} from '../controller/restaurent/AuthControlle.js'
import {
    // ProductAdd,
    ProductList,
    addProduct,
    addCategory,
    getCategories,
    getRestaurentProducts,
    getProductData,
    updateProduct,
    deleteProduct,
    editCategory,
    deleteCategory

}from '../controller/restaurent/restaurentController.js'
import VerifyToken from '../middleware/jwtRestaurentVerification.js'    

const router =express.Router()

router.post('/register',signup)  
router.post('/login',login)
// router.post('/addFood',ProductAdd)
router.get('/productList',ProductList)
router.post('/addProduct',addProduct)
router.post('/addCategory',addCategory)
router.get('/getCategory',getCategories)
router.patch('/editCategory',editCategory);
router.patch('/deleteCategory',deleteCategory)

router.get('/getRestaurentProduct',getRestaurentProducts)
router.get('/editProduct',getProductData)
router.patch('/updateProduct',updateProduct)
router.patch('/deleteProduct',deleteProduct)

export default router