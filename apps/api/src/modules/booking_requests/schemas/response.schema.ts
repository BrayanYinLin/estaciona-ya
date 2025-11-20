import { z } from 'zod'

export const ResponseBookinRequest = z.object({
  id: z.number(),

  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    dni: z.string()
  }),

  garage: z.object({
    id: z.number(),
    price: z.number(),
    description: z.string(),
    covered: z.boolean(),
    hasCameras: z.boolean(),
    restrictions: z.string(),
    state: z.boolean(),
    location: z.object({
      address: z.string()
    }),
    photos: z.array(
      z.object({
        url: z.string()
      })
    )
  }),

  startDate: z.date(),
  endDate: z.date(),
  status: z.string()
})

export type ResponseBookingRequest = z.infer<typeof ResponseBookinRequest>
