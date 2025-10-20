import { AuthControllerImpl } from '@auth/auth.controller'
import { checkSchema } from '@shared/middlewares/check-schema.middleware'
import { Router } from 'express'
import { RegisterUserSchema } from './schemas/register_user.schema'
import { LoginUserSchema } from './schemas/login_user.schema'
import { AuthServiceImpl } from './auth.service'
import { RoleRepositoryImpl } from '@roles/role.repository'
import { AppDataSource } from '@shared/database/data-source'
import { Role } from '@roles/entities/role.entity'
import { User } from '@users/entities/user.entity'
import { UserRepositoryImpl } from '@users/user.repository'
import { inyectUserFromToken } from '@shared/middlewares/inyect-user-from-token.middleware'
import { MailServiceImpl } from '../mails/mails_service'
import { env_resend_api } from '@shared/config/env.config'
import { Resend } from 'resend'

const authRouter = Router()

const roleRepository = new RoleRepositoryImpl(AppDataSource.getRepository(Role))
const userRepository = new UserRepositoryImpl(AppDataSource.getRepository(User))

const resend = new Resend(env_resend_api)
const mailService = new MailServiceImpl(resend)

const service = new AuthServiceImpl(userRepository, roleRepository, mailService)

const controller = new AuthControllerImpl(service)

authRouter.post(
  '/tenant',
  checkSchema(RegisterUserSchema),
  controller.createTenant.bind(controller)
)
authRouter.post(
  '/lessor',
  checkSchema(RegisterUserSchema),
  controller.createLessor.bind(controller)
)
authRouter.post(
  '/login',
  checkSchema(LoginUserSchema),
  controller.login.bind(controller)
)
authRouter.get('/refresh', controller.refresh.bind(controller))
authRouter.get('/logout', controller.logout.bind(controller))
authRouter.get(
  '/validate',
  inyectUserFromToken(),
  controller.validate.bind(controller)
)
export { authRouter }
