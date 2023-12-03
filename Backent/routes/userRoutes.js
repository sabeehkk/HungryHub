import express from "express";

import {
  signup,
  userLogin,
  googleLogin,
  verifySignup,
  verifyOtp,
} from "../controller/user/AuthController.js";

import {
  updateProfile,
  updatePassword,
  updateProfilePhoto,
  addAddress,
  getUserData
} from "../controller/user/userController.js";
import {
  getCategories,
  getRestWithCategory
} from '../controller/user/restaurent.js'

import {getProductData} from '../controller/restaurent/restaurentController.js'

import VerifyToken from "../middleware/jwtUserVerification.js";
import { addToCart,getCart,changeQuantity,cartTotal,cancelCartItem } from "../controller/user/cartController.js";
import {Order} from "../controller/user/orderController.js"
import Cart from "../models/cart.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", userLogin);
router.post("/googleLogin", googleLogin);
router.post("/signupVerify", verifySignup);
router.post("/verifyOtp", verifyOtp);

router.patch("/profile/:userId/edit",VerifyToken, updateProfile);
router.patch("/profile/:userId/editPassword",VerifyToken, updatePassword);
router.patch("/profile/:userId/edit/profilePhoto",VerifyToken, updateProfilePhoto);
router.get('/getUserData',getUserData)

router.get('/getCategoryies',getCategories)
router.get('/getcatRestaurents',getRestWithCategory)
   
router.get('/getProuductDetail',getProductData)
router.post('/addToCart',addToCart)
router.get('/getCart',getCart)
router.patch("/changeQuantity",changeQuantity)
router.patch("/updateTotal",cartTotal)
router.patch("/cancelCartItem",cancelCartItem)
router.patch("/addAddress",addAddress)
router.post('/order',Order)

//restaurnet Product list 

export default router;
