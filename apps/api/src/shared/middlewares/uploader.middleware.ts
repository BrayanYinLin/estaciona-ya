import multer from 'multer'

const storage = multer.memoryStorage()

const FILESIZE = 4 * 1024 * 1024 // 6MB

export const upload = multer({
  storage,
  limits: {
    fileSize: FILESIZE
  }
})
