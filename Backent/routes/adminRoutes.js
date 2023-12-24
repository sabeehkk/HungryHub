import expres from "express";

import {
  login,
  userList,
  userUnblock,
  userBlock,
} from "../controller/admin/AuthController.js";

import {
  employeeBlock,
  employeeList,
  employeeUnblock,
  restaurentBlock,
  restaurentList,
  restaurentUnblock,
} from "../controller/admin/adminManagement.js";

import VerifyToken from "../middleware/jwtAdminVerification.js";

const router = expres();

router.post("/login", login);
router.get("/users", VerifyToken, userList);
router.patch("/users/:id/unblock", VerifyToken, userUnblock);
router.patch("/users/:id/block", VerifyToken, userBlock);

router.get("/restaurents", VerifyToken, restaurentList);
router.patch("/restaurents/:id/unblock", VerifyToken, restaurentUnblock);
router.patch("/restaurents/:id/block", VerifyToken, restaurentBlock);

router.get("/employees", VerifyToken, employeeList);
router.patch("/employees/:id/unblock", VerifyToken, employeeUnblock);
router.patch("/employees/:id/block", VerifyToken, employeeBlock);

export default router;
