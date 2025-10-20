import { FileStorageService } from './file-storage'
import { extname, join } from 'node:path'
import { FILES_ROUTE } from '@shared/constants/files.route'
import constants from 'node:constants'
import { access, unlink, writeFile } from 'node:fs/promises'
import { DomainError } from '@shared/utils/error'
import { DOMAIN_ERRORS } from '@shared/constants/domain.code'
import { FilePayload } from './file.dto'

export class LocalFileStorageService implements FileStorageService {
  async delete(path: string): Promise<void> {
    await unlink(path)
  }

  async save({
    url,
    saveName,
    originalname,
    buffer
  }: FilePayload): Promise<string> {
    const ext = extname(originalname)

    await writeFile(
      join(process.cwd(), FILES_ROUTE, saveName.concat(ext)),
      buffer
    )

    const path = url.concat(saveName, extname(originalname))

    return path
  }

  async sendPhotoPath(photoId: string): Promise<string> {
    try {
      const rutaFoto = join(process.cwd(), FILES_ROUTE, photoId)

      await access(rutaFoto, constants.F_OK)

      return rutaFoto
    } catch (e) {
      throw new DomainError({
        code: DOMAIN_ERRORS.PHOTO_ERROR.code,
        message: 'Foto no encontrada',
        cause: e as Error
      })
    }
  }
}
