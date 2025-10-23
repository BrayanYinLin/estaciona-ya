import { NextFunction, Request, Response } from 'express'
import { CreateGarageDto } from './schemas/create_garage.schema'

export interface GarageRepository {
  saveGarage(garage: CreateGarageDto): Promise<Garage>
}

export interface GarageController {
  saveGarage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
