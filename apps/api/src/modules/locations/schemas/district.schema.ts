import z from 'zod'

export const DistrictSchema = z.object({
  id: z.number().positive(),
  name: z.string()
})

export type DistrictDto = z.infer<typeof DistrictSchema>
