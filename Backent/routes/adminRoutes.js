import expres from 'express'

import { login,action } from '../controller/admin/AuthController.js'

const router =expres()

router.post('/login',login)

router.get('/actions',action)

export default router