import { AuthControllerImpl } from '@auth/controllers/auth.controller'
import { Router } from 'express'

const authRouter = Router()
const controller = new AuthControllerImpl()

authRouter.post('/tenant', controller.createTenant.bind(controller))

export { authRouter }
