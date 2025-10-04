import { UpdateUserDto } from '@auth/entities/dto/user.dto'
import { FILES_ROUTE } from '@shared/constants/files.route'
import { checkSchema } from '@shared/middlewares/check-schema.middleware'
import { inyectUserFromToken } from '@shared/middlewares/inyect-user-from-token.middleware'
import { upload } from '@shared/middlewares/uploader.middleware'
import { UserControllerImpl } from '@users/controllers/user.controller'
import { Router } from 'express'

import { access, constants } from 'node:fs'
import { join } from 'node:path'

const userRouter = Router()
const controller = new UserControllerImpl()

userRouter.get('/', controller.findProfile.bind(controller))
userRouter.get('/photo/:photoId', (req, res) => {
  const photo = req.params.photoId

  // Suponiendo que tus fotos están en la carpeta "fotos" y se nombran por ID
  const rutaFoto = join(process.cwd(), FILES_ROUTE, photo)

  // Verificamos que exista la foto
  access(rutaFoto, constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('Foto no encontrada')
    }

    // Enviamos la foto
    res.sendFile(rutaFoto)
  })
})
userRouter.delete('/', controller.deactivateAccount.bind(controller))
userRouter.patch(
  '/me',
  upload.single('photo'),
  inyectUserFromToken(),
  checkSchema(UpdateUserDto),
  controller.updateProfile.bind(controller)
)

export { userRouter }
