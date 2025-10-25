import { NextFunction, Request, Response } from 'express'
import {
  CreateGarageDto,
  CreateGarageFormDto
} from './schemas/create_garage.schema'
import { Garage } from './entities/garage.entity'

export interface GarageRepository {
  saveGarage(garage: CreateGarageDto): Promise<Garage>
}

export interface ICreateGaragePhoto {
  garage: {
    id: number
  }
  url: string
}

export interface GaragePhotoRepository {
  saveGaragePhoto(photo: ICreateGaragePhoto): Promise<void>
}

export interface GarageService {
  saveGarage(garage: CreateGarageFormDto): Promise<void>
}

export interface GarageController {
  saveGarage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
