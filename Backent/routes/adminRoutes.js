import expres from 'express'

import { login,userList,userUnblock,userBlock } from '../controller/admin/AuthController.js'

const router =expres()

router.post('/login',login)

router.get('/users',userList)
router.patch('/users/:id/unblock',userUnblock)

router.patch('/users/:id/block',userBlock)



export default router