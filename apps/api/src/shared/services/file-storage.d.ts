import { FilePayload } from './file.dto'

export interface FileStorageService {
  save(file: FilePayload): Promise<string>
  sendPhotoPath(photoId: string): Promise<string>
  delete(path: string): Promise<void>
}
