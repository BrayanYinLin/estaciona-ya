import { FileSchema } from '@root/modules/files/schemas/file.schema'
import { UserIdentifierSchema } from '@users/schemas/user.schema'
import { z } from 'zod'

export const CreateLocationSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
  address: z.string(),
  district: z.number(),
  garage: z.number()
})

export const CreateGarageFormSchema = z.object({
  user: z.object({
    id: UserIdentifierSchema
  }),
  price: z.string().transform((val) => {
    const price = Number(val)
    if (isNaN(price)) throw new Error('Price must be a number')
    return price
  }),
  district: z.string().transform((val) => {
    const district = Number(val)
    if (isNaN(district)) throw new Error('District must be a number')
    return district
  }),
  address: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  description: z.string(),
  restrictions: z.string(),
  covered: z.string().transform((val) => {
    return val === 'true'
  }),
  hasCameras: z.string().transform((val) => {
    return val === 'true'
  }),
  rentMode: z.string().transform((val) => {
    const mode = Number(val)
    if (isNaN(mode)) throw new Error('RENTMODE must be a number')
    return mode
  }),
  photos: z.array(FileSchema)
})

export const CreateGarageSchema = z.object({
  user: z.object({
    id: UserIdentifierSchema
  }),
  price: z.string().transform((val) => {
    const price = Number(val)
    if (isNaN(price)) throw new Error('Price must be a number')
    return price
  }),
  description: z.string(),
  restrictions: z.string(),
  covered: z.string().transform((val) => {
    return val === 'true'
  }),
  hasCameras: z.string().transform((val) => {
    return val === 'true'
  }),
  rentMode: z.string().transform((val) => {
    const mode = Number(val)
    if (isNaN(mode)) throw new Error('RENTMODE must be a number')
    return mode
  })
})

export type CreateGarageDto = z.infer<typeof CreateGarageSchema>
export type CreateGarageFormDto = z.infer<typeof CreateGarageFormSchema>
export type CreateLocationDto = z.infer<typeof CreateLocationSchema>
