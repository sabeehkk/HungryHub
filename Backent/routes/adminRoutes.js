import expres from 'express'

import { login,userList,userUnblock,userBlock } from '../controller/admin/AuthController.js'

import {employeeBlock, employeeList, employeeUnblock, restaurentBlock, restaurentList, restaurentUnblock} from '../controller/admin/adminManagement.js'

import VerifyToken from '../middleware/jwtAdminVerification.js' ;

const router =expres()

router.post('/login',login)

router.get('/users',VerifyToken,userList)
router.patch('/users/:id/unblock',userUnblock)
router.patch('/users/:id/block',userBlock)

router.get('/restaurents',restaurentList)
router.patch('/restaurents/:id/unblock',restaurentUnblock)
router.patch('/restaurents/:id/block',restaurentBlock)

router.get('/employees',employeeList)
router.patch('/employees/:id/unblock',employeeUnblock)
router.patch('/employees/:id/block',employeeBlock)

export default router