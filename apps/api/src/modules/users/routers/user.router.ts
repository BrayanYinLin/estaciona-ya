import { UserControllerImpl } from '@users/controllers/user.controller'
import { Router } from 'express'

const userRouter = Router()
const controller = new UserControllerImpl()

userRouter.get('/', controller.findProfile.bind(controller))

export { userRouter }
