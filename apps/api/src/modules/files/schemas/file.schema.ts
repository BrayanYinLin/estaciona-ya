import z from 'zod'

export const FileSchema = z.object({
  originalname: z.string(),
  buffer: z.instanceof(Buffer)
})
