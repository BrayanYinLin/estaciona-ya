import { Garage } from '@garages/entities/garage.entity'
import { Filters, GarageRepository } from '../garage'
import { CreateGarageFormDto } from '../schemas/create_garage.schema'
import { Repository } from 'typeorm'
import { BookingRequest } from '@booking_requests/entities/booking-requests.entity'

export class GarageRepositoryImpl implements GarageRepository {
  constructor(private readonly repository: Repository<Garage>) {}

  async findAll({
    page,
    size,
    covered,
    hasCameras,
    mode,
    district,
    minPrice,
    maxPrice,
    filters
  }: Filters): Promise<Garage[]> {
    const skip = (page - 1) * size

    const query = this.repository
      .createQueryBuilder('garage')
      .leftJoinAndSelect('garage.location', 'location')
      .leftJoinAndSelect('location.district', 'districtAlias')
      .leftJoinAndSelect('garage.rentMode', 'rentMode')
      .leftJoinAndSelect('garage.photos', 'photos')
      .leftJoinAndSelect('garage.bookingRequests', 'booking')

    if (covered !== undefined)
      query.andWhere('garage.covered = :covered', { covered })
    if (hasCameras !== undefined)
      query.andWhere('garage.hasCameras = :hasCameras', { hasCameras })
    if (mode !== undefined)
      query.andWhere('rentMode.mode_name = :mode', { mode })
    if (district !== undefined)
      query.andWhere('districtAlias.name LIKE :district', {
        district: `%${district}%`
      })

    if (minPrice !== undefined && maxPrice === undefined)
      query.andWhere('garage.price >= :minPrice', { minPrice })
    if (maxPrice !== undefined && minPrice === undefined)
      query.andWhere('garage.price <= :maxPrice', { maxPrice })
    if (minPrice !== undefined && maxPrice !== undefined)
      query.andWhere('garage.price BETWEEN :minPrice AND :maxPrice', {
        minPrice,
        maxPrice
      })

    if (filters) {
      if (filters.type === 'hour') {
        query.andWhere(
          (qb) => {
            const subQuery = qb
              .subQuery()
              .select('b.id')
              .from(BookingRequest, 'b')
              .where('b.garageId = garage.id')
              .andWhere('b.startTime < :endHour AND b.endTime > :startHour')
              .getQuery()
            return `NOT EXISTS ${subQuery}`
          },
          {
            startHour: filters.startHour,
            endHour: filters.endHour
          }
        )
      }

      if (filters.type === 'day') {
        query.andWhere(
          (qb) => {
            const subQuery = qb
              .subQuery()
              .select('b.id')
              .from(BookingRequest, 'b')
              .where('b.garageId = garage.id')
              .andWhere('b.startTime < :endDay AND b.endTime > :startDay')
              .getQuery()
            return `NOT EXISTS ${subQuery}`
          },
          {
            startDay: filters.startDay,
            endDay: filters.endDay
          }
        )
      }

      if (filters.type === 'month') {
        query.andWhere(
          (qb) => {
            const subQuery = qb
              .subQuery()
              .select('b.id')
              .from(BookingRequest, 'b')
              .where('b.garageId = garage.id')
              .andWhere('b.startTime < :endMonth AND b.endTime > :startMonth')
              .getQuery()
            return `NOT EXISTS ${subQuery}`
          },
          {
            startMonth: filters.startMonth,
            endMonth: filters.endMonth
          }
        )
      }
    }

    query.skip(skip).take(size).orderBy('garage.id', 'ASC')

    const garages = await query.getMany()
    return garages
  }

  async findAllByUserId(
    userId: number,
    page: number,
    size: number
  ): Promise<Garage[]> {
    const skip = (page - 1) * size

    const query = this.repository
      .createQueryBuilder('garage')
      .leftJoinAndSelect('garage.location', 'location')
      .leftJoinAndSelect('location.district', 'districtAlias')
      .leftJoinAndSelect('garage.rentMode', 'rentMode')
      .leftJoinAndSelect('garage.photos', 'photos')
      .leftJoinAndSelect('garage.bookingRequests', 'booking')
      .leftJoinAndSelect('garage.user', 'user')

    query.andWhere('garage.user.id = :userId', { userId })
    query.skip(skip).take(size).orderBy('garage.id', 'ASC')

    // const garages = await this.repository.find({
    //   where: {
    //     user: {
    //       id: userId
    //     }
    //   },
    //   relations: [
    //     'user',
    //     'rentMode',
    //     'bookingRequests',
    //     'location',
    //     'photos',
    //     'location.district'
    //   ]
    // })

    const garages = await query.getMany()

    return garages
  }

  async saveGarage(garage: CreateGarageFormDto): Promise<Garage> {
    const savedGarage = await this.repository.save({
      hasCameras: garage.hasCameras,
      covered: garage.covered,
      price: garage.price,
      description: garage.description,
      restrictions: garage.restrictions,
      rentMode: { id: garage.rentMode },
      user: {
        id: garage.user.id
      }
    })

    return savedGarage
  }
  async findGarageById(garageId: number): Promise<Garage | null> {
    const garage = await this.repository.findOne({
      where: {
        id: garageId
      },
      relations: [
        'user',
        'rentMode',
        'bookingRequests',
        'bookingRequests.user',
        'location',
        'photos',
        'location.district'
      ]
    })
    return garage
  }
  async disableGarage(garageId: number): Promise<void> {
    await this.repository.update(garageId, { state: false })
  }
}
