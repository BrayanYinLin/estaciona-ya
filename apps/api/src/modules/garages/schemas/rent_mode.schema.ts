import { RENT_MODES } from '@shared/constants/rent_modes'
import { z } from 'zod'

export const RentModeSchema = z.object({
  id: z.number().positive(),
  mode_name: z.enum(Object.values(RENT_MODES))
})

export type RentModeDto = z.infer<typeof RentModeSchema>
