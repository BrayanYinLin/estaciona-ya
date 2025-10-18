import { CreateGarageDto } from './schemas/create_garage.schema'

export interface GarageRepository {
  saveGarage(garage: CreateGarageDto): Promise<void>
}
