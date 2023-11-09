import expres from 'express'

import { login,action,DeleteUser } from '../controller/admin/AuthController.js'

const router =expres()

router.post('/login',login)

router.get('/actions',action)

router.post('/deleteuser',DeleteUser);


export default router