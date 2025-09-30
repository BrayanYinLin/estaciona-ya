import { AuthControllerImpl } from '@auth/controllers/auth.controller'
import { CreateUserDto, LoginUserDto } from '@auth/entities/dto/user.dto'
import { checkSchema } from '@shared/middlewares/check-schema.middleware'
import { Router } from 'express'

const authRouter = Router()
const controller = new AuthControllerImpl()

authRouter.post(
  '/tenant',
  checkSchema(CreateUserDto),
  controller.createTenant.bind(controller)
)
authRouter.post(
  '/lessor',
  checkSchema(CreateUserDto),
  controller.createLessor.bind(controller)
)
authRouter.post(
  '/login',
  checkSchema(LoginUserDto),
  controller.login.bind(controller)
)
authRouter.get('/refresh', controller.refresh.bind(controller))

export { authRouter }
