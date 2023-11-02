import expres from 'express'

import { login } from '../controller/admin/AuthController.js'

const router =expres()

router.post('/login',login)

export default router