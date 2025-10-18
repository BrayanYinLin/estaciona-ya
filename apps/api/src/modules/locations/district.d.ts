import { Request, Response } from 'express'
import { DistrictDto } from './schemas/district.schema'

export interface DistrictRepository {
  findById(id: number): Promise<DistrictDto | null>
  findAll(): Promise<DistrictDto[]>
}

export interface DistrictService {
  findById(id: number): Promise<DistrictDto>
  getAll(): Promise<DistrictDto[]>
}

export interface DistrictController {
  getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
