import { UploadFile } from '@auth/entities/dto/user.dto'

export interface FileStorageService {
  save(file: UploadFile): Promise<string>
  sendPhotoPath(photoId: string): Promise<string>
}
