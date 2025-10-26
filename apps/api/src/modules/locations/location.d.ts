import { NextFunction, Request, Response } from 'express'
import { ResponseThirdPartyLocationDto } from './schemas/response_location.schema'
import { CreateLocationDto } from '@garages/schemas/create_garage.schema'
import { Location } from './entities/locations.entity'

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

export interface LocationRepository {
  saveLocation(location: CreateLocationDto): Promise<Location>
  findLocationByGarageId(garage: number): Promise<Location | null>
}
