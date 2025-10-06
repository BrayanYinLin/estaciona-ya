import { UploadFile } from '@auth/entities/dto/user.dto'
import { FileStorageService } from './file-storage'
import { join } from 'node:path'
import { FILES_ROUTE } from '@shared/constants/files.route'
import constants from 'node:constants'
import { access } from 'node:fs/promises'
import { DomainError } from '@shared/utils/error'
import { DOMAIN_ERRORS } from '@shared/constants/domain.code'

export class LocalFileStorageService implements FileStorageService {
  async save(file: UploadFile): Promise<string> {
    return file.originalname
  }

  async sendPhotoPath(photoId: string): Promise<string> {
    try {
      const rutaFoto = join(process.cwd(), FILES_ROUTE, photoId)

      await access(rutaFoto, constants.F_OK)

      return rutaFoto
    } catch (e) {
      throw new DomainError({
        code: DOMAIN_ERRORS.PHOTO_ERROR.code,
        message: DOMAIN_ERRORS.PHOTO_ERROR.message,
        cause: e as Error
      })
    }
  }
}
