import { RentMode } from './entities/rent_modes.entity'
import { RentModeDto } from './schemas/rent_mode.schema'
import { Request, Response } from 'express'

export interface RentModeRepository {
  findAll(): Promise<RentModeDto[]>
  findById(id: number): Promise<RentModeDto | null>
}

export interface RentModeService {
  findAll(): Promise<RentMode[]>
  findById(id: number): Promise<RentMode>
}

export interface RentModeController {
  findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
