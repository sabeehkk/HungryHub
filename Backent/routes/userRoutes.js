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
} from "../controller/user/userController.js";
import {
  getCategories,
  getRestWithCategory
} from '../controller/user/restaurent.js'

import VerifyToken from "../middleware/jwtUserVerification.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", userLogin);
router.post("/googleLogin", googleLogin);
router.post("/signupVerify", verifySignup);
router.post("/verifyOtp", verifyOtp);

router.patch("/profile/:userId/edit",VerifyToken, updateProfile);
router.patch("/profile/:userId/editPassword",VerifyToken, updatePassword);
router.patch("/profile/:userId/edit/profilePhoto",VerifyToken, updateProfilePhoto);

router.get('/getCategoryies',getCategories)
router.get('/getcatRestaurents',getRestWithCategory)
export default router;
