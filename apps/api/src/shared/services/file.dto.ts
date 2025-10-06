import z from 'zod'

export const FilePayloadDtoSchema = z.object({
  url: z.string(),
  saveName: z.uuid(),
  originalname: z.string(),
  buffer: z.instanceof(Buffer)
})
export type FilePayload = z.infer<typeof FilePayloadDtoSchema>
