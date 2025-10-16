import { z } from 'zod'

export const OpenStreetMapResponseSchema = z.object({
  lat: z.string(),
  lon: z.string(),
  display_name: z.string()
})

export type OpenStreetMapResponseDto = z.infer<
  typeof OpenStreetMapResponseSchema
>

export const ResponseThirdPartyLocationSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
  address: z.string()
})

export type ResponseThirdPartyLocationDto = z.infer<
  typeof ResponseThirdPartyLocationSchema
>
