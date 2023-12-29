import express from "express";

import {
  signup,
  userLogin,
  googleLogin,
  verifySignup,
  verifyOtp,
  forgotPassword,
  otpVerification,
  resetPassword,
} from "../controller/user/authController.js";

import {
  updateProfile,
  updatePassword,
  updateProfilePhoto,
  addAddress,
  editAddress,
  getUserData,
  saveChat,
  getChat,
} from "../controller/user/userController.js";
import {
  getCategories,
  getRestWithCategory,
} from "../controller/user/restaurent.js";

import { getProductData } from "../controller/restaurent/restaurentController.js";

import VerifyToken from "../middleware/jwtUserVerification.js";
import {
  addToCart,
  getCart,
  changeQuantity,
  cartTotal,
  cancelCartItem,
} from "../controller/user/cartController.js";
import {
  Order,
  getOrders,
  getOrderItems,
  cancelOrder,
  doRating,
  doReview,
} from "../controller/user/orderController.js";
import Cart from "../models/cart.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", userLogin);
router.post("/googleLogin", googleLogin);
router.post("/signupVerify", verifySignup);
router.post("/verifyOtp", verifyOtp);
router.patch("/profile/:userId/edit", VerifyToken, updateProfile);
router.patch("/profile/:userId/editPassword", VerifyToken, updatePassword);
router.patch(
  "/profile/:userId/edit/profilePhoto",
  VerifyToken,
  updateProfilePhoto
);
router.get("/getUserData", getUserData);
router.get("/getCategoryies", getCategories);
router.get("/getcatRestaurents", getRestWithCategory);

router.get("/getProuductDetail", getProductData);
router.post("/addToCart", VerifyToken, addToCart);
router.get("/getCart", VerifyToken, getCart);
router.patch("/changeQuantity", VerifyToken, changeQuantity);
router.patch("/updateTotal", VerifyToken, cartTotal);
router.patch("/cancelCartItem", VerifyToken, cancelCartItem);
router.patch("/addAddress", VerifyToken, addAddress);
router.patch("/editAddress", VerifyToken, editAddress);

router.post("/order", Order);
router.patch("/cancelOrder", cancelOrder);
router.get("/getOrderHistory", getOrders);
router.get("/orderItems", getOrderItems);
router.patch("/rating", doRating);
router.patch("/review", doReview);
router.post("/saveChat", saveChat);
router.get("/getchat", getChat);
router.post("/forgot-password", forgotPassword);
router.post("/forgot-password/otp", otpVerification);
router.post("/forgot-password/reset-password", resetPassword);

export default router;
