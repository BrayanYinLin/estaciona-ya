import { FileSchema } from '@root/modules/files/schemas/file.schema'
import { RENT_MODES } from '@shared/constants/rent_modes'
import { UserIdentifierSchema } from '@users/schemas/user.schema'
import { z } from 'zod'

export const CreateLocationSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
  address: z.string(),
  district: z.object({
    id: z.number().positive(),
    name: z.string()
  })
})

export const CreateGarageSchema = z.object({
  user: z.object({
    id: UserIdentifierSchema
  }),
  price: z.number().positive({ error: 'El precio no puede ser negativo' }),
  description: z.string(),
  covered: z.boolean(),
  hasCameras: z.boolean(),
  restrictions: z.string(),
  rentMode: z.enum(Object.values(RENT_MODES), {
    error: 'Escoger una modalidad dentro de las proporcionadas'
  }),
  location: CreateLocationSchema,
  garagePhotos: z.array(FileSchema)
})

export type CreateGarageDto = z.infer<typeof CreateGarageSchema>
