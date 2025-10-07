import {
  ChangePasswordDtoSchema,
  UpdateUserDto
} from '@auth/entities/dto/user.dto'
import { User } from '@auth/entities/user.entity'
import { AppDataSource } from '@shared/database/data-source'
import { checkSchema } from '@shared/middlewares/check-schema.middleware'
import { inyectUserFromToken } from '@shared/middlewares/inyect-user-from-token.middleware'
import { upload } from '@shared/middlewares/uploader.middleware'
import { LocalFileStorageService } from '@shared/services/local-file-storage.service'
import { UserControllerImpl } from '@users/controllers/user.controller'
import { UserServiceImpl } from '@users/services/user.service'
import { Router } from 'express'

const userRouter = Router()

const userRepository = AppDataSource.getRepository(User)

const fileService = new LocalFileStorageService()
const userService = new UserServiceImpl(userRepository, fileService)

const controller = new UserControllerImpl(userService)

userRouter.get('/', controller.findProfile.bind(controller))
userRouter.get('/photo/:photoId', controller.findPhoto.bind(controller))
userRouter.delete('/', controller.deactivateAccount.bind(controller))
userRouter.patch(
  '/me',
  upload.single('photo'),
  inyectUserFromToken(),
  checkSchema(UpdateUserDto),
  controller.updateProfile.bind(controller)
)
userRouter.patch(
  '/me/password',
  inyectUserFromToken(),
  checkSchema(ChangePasswordDtoSchema),
  controller.changePassword.bind(controller)
)

export { userRouter }
