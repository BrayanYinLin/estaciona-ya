import { z } from 'zod'

export const createBookingRequestSchema = z.object({
  garageId: z.number().int().positive(),
  tenantId: z.number().int().positive(),
  startDate: z.preprocess((arg) => new Date(arg as string), z.date()),
  endDate: z.preprocess((arg) => new Date(arg as string), z.date())
})

export type CreateBookingRequestDto = z.infer<typeof createBookingRequestSchema>
