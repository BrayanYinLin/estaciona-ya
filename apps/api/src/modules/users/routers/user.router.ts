import { UpdateUserDto } from '@auth/entities/dto/user.dto'
import { checkSchema } from '@shared/middlewares/check-schema.middleware'
import { inyectUserFromToken } from '@shared/middlewares/inyect-user-from-token.middleware'
import { upload } from '@shared/middlewares/uploader.middleware'
import { UserControllerImpl } from '@users/controllers/user.controller'
import { Router } from 'express'

const userRouter = Router()
const controller = new UserControllerImpl()

userRouter.get('/', controller.findProfile.bind(controller))
userRouter.delete('/', controller.deactivateAccount.bind(controller))
userRouter.patch(
  '/me',
  upload.single('photo'),
  inyectUserFromToken(),
  checkSchema(UpdateUserDto),
  controller.updateProfile.bind(controller)
)

export { userRouter }
