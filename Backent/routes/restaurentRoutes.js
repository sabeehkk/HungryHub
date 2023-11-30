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
router.get('/productList',VerifyToken,ProductList)
router.post('/addProduct',VerifyToken,addProduct)
router.post('/addCategory',VerifyToken,addCategory)
router.get('/getCategory',VerifyToken,getCategories)
router.patch('/editCategory',VerifyToken,editCategory);
router.patch('/deleteCategory',VerifyToken,deleteCategory)

router.get('/getRestaurentProduct',VerifyToken,getRestaurentProducts)
router.get('/editProduct',VerifyToken,getProductData)
router.patch('/updateProduct',VerifyToken,updateProduct)
router.patch('/deleteProduct',VerifyToken,deleteProduct)

export default router