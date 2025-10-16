import { NextFunction, Request, Response } from 'express'
import { ResponseThirdPartyLocationDto } from './schemas/response_location.schema'

export interface LocationService {
  findLocationByName(name: string): Promise<ResponseThirdPartyLocationDto>
}

export interface LocationController {
  findLocationByName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
