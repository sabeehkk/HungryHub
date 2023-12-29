import express from "express";

import {
  signup,
  login,
  forgotPassword,
  otpVerification,
  resetPassword,
} from "../controller/employee/AuthController.js";
import {
  getEmplOrders,
  listEmployees,
  saveChat,
  getChat,
  dashboardData
} from "../controller/employee/orderController.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.get("/getordersempl", getEmplOrders);
router.get("/listEmployees", listEmployees);
router.post("/saveChat", saveChat);
router.get("/getchat", getChat);
router.post("/forgot-password", forgotPassword);
router.post("/forgot-password/otp", otpVerification);
router.post("/forgot-password/reset-password", resetPassword);
router.get("/dashboardData", dashboardData);

export default router;
