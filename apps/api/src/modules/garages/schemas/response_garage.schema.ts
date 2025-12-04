import { z } from 'zod'

const RentModeSchema = z.object({
  id: z.number(),
  mode_name: z.string()
})

export const ResponseGarageSchema = z.object({
  id: z.number(),
  rentMode: RentModeSchema,
  price: z.number(),
  description: z.string(),
  photos: z
    .array(
      z.object({
        url: z.string()
      })
    )
    .optional(),
  covered: z.boolean(),
  hasCameras: z.boolean(),
  restrictions: z.string(),
  location: z.object({
    id: z.number(),
    address: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    district: z.object({
      id: z.number(),
      name: z.string()
    })
  }),
  state: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const ResponseGarageSchemaById = z.object({
  id: z.number(),
  rentMode: RentModeSchema,
  price: z.number(),
  description: z.string(),
  photos: z
    .array(
      z.object({
        url: z.string()
      })
    )
    .optional(),
  covered: z.boolean(),
  hasCameras: z.boolean(),
  restrictions: z.string(),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    photo: z.string().nullable()
  }),
  location: z.object({
    id: z.number(),
    address: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    district: z.object({
      id: z.number(),
      name: z.string()
    })
  }),
  bookingRequests: z
    .array(
      z.object({
        id: z.number(),
        startDate: z.date(),
        user: z.object({
          id: z.number(),
          name: z.string(),
          email: z.string().optional()
        })
      })
    )
    .optional(),
  state: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date()
})

export type ResponseGarageDto = z.infer<typeof ResponseGarageSchema>
export type ResponseGarageByIdDto = z.infer<typeof ResponseGarageSchemaById>
