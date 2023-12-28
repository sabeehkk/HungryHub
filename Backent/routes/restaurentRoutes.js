import express from "express";

import {
  signup,
  login,
  updateRestoProfilePhoto,
  forgotPassword,
  otpVerification,
  resetPassword,
} from "../controller/restaurent/AuthControlle.js";
import {
  ProductList,
  addProduct,
  addCategory,
  getCategories,
  getRestaurentProducts,
  getProductData,
  updateProduct,
  deleteProduct,
  editCategory,
  deleteCategory,
  getResProfile,
} from "../controller/restaurent/restaurentController.js";

import { getRestaurents } from "../controller/restaurent/productController.js";
import VerifyToken from "../middleware/jwtRestaurentVerification.js";

import {
  viewOrders,
  updateDeliveryStatus,
  dashboardData,
  splitOrder,
} from "../controller/restaurent/orderManagement.js";
import {
  getOrderItems,
  cancelOrder,
} from "../controller/user/orderController.js";
const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.get("/productList", ProductList);
router.post("/addProduct", VerifyToken, addProduct);
router.post("/addCategory", VerifyToken, addCategory);
router.get("/getCategory", getCategories);
router.patch("/editCategory", VerifyToken, editCategory);
router.patch("/deleteCategory", VerifyToken, deleteCategory);

//Product Controlling
router.get("/getRestaurentProduct", getRestaurentProducts);
router.get("/editProduct", VerifyToken, getProductData);
router.patch("/updateProduct", VerifyToken, updateProduct);
router.patch("/deleteProduct", VerifyToken, deleteProduct);

router.get("/getResProfile", getResProfile);
router.get("/getRestaurents", getRestaurents);
router.get("/viewOrders", viewOrders);
router.get("/getOrderIterms", getOrderItems);
router.patch("/updateDeliveryStatus", updateDeliveryStatus);
router.patch("/cancelOrder", cancelOrder);
router.get("/dashboardData", dashboardData);
router.post("/splitOrder", splitOrder);
router.patch("/profile/:userId/edit/profilePhoto", updateRestoProfilePhoto);
router.post("/forgot-password", forgotPassword);
router.post("/forgot-password/otp", otpVerification);
router.post("/forgot-password/reset-password", resetPassword);

export default router;
