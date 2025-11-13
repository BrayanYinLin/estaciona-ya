import { NextFunction, Request, Response } from 'express'
import {
  CreateGarageDto,
  CreateGarageFormDto
} from './schemas/create_garage.schema'
import { Garage } from './entities/garage.entity'
import { ResponseGarageDto } from './schemas/response_garage.schema'

export interface IGarage {
  id: number
  ownerId: number
  rentModeId: number
  price: number
  description: string
  covered: boolean
  hasCameras: boolean
  restrictions: string
  state: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ICreateGaragePhoto {
  garage: {
    id: number
  }
  url: string
}

export interface IGaragePhoto {
  id: number
  url: string
  garageId: number
}

export type HourFilter = {
  type: 'hour'
  day: string
  startHour: number
  endHour: number
}

export type DayFilter = {
  type: 'day'
  startDay: string
  endDay: string
}

export type MonthFilter = {
  type: 'month'
  startMonth: string
  endMonth: string
}

export type Filters = {
  page: number
  size: number
  covered?: boolean
  hasCameras?: boolean
  mode?: string
  district?: string
  minPrice?: number
  maxPrice?: number
  filters?: HourFilter | DayFilter | MonthFilter
}

export interface GarageRepository {
  saveGarage(garage: CreateGarageDto): Promise<Garage>
  findAllByUserId(userId: number): Promise<Garage[]>
  findAll(filters: Filters): Promise<Garage[]>
}

export interface GaragePhotoRepository {
  saveGaragePhoto(photo: ICreateGaragePhoto): Promise<void>
  findAllByGarageId(garage: number): Promise<IGaragePhoto[]>
}

export interface GarageService {
  saveGarage(garage: CreateGarageFormDto): Promise<void>
  findAllByUserId(user: number): Promise<ResponseGarageDto[]>
  findPhoto(id: string): Promise<string>
  findAll(filters: Filters): Promise<ResponseGarageDto[]>
}

export interface GarageController {
  saveGarage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
  findAllByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
  findPhoto(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
  findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
