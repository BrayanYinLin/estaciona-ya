import { RentModeDto } from './schemas/rent_mode.schema'
import { Request, Response } from 'express'

export interface RentModeRepository {
  findAll(): Promise<RentModeDto[]>
}

export interface RentModeService {
  findAll(): Promise<RentModeDto[]>
}

export interface RentModeController {
  findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
