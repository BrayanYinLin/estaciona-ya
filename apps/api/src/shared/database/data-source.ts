import { DataSource } from 'typeorm'
import {
  env_database_db,
  env_host_db,
  env_node,
  env_password_db,
  env_port_db,
  env_username_db
} from '../config/env.config'
import { User } from '@auth/entities/user.entity'
import { Role } from '@roles/entities/role.entity'
import { Garage } from '@root/modules/garages/entities/garage.entity'
import { GaragePhoto } from '@root/modules/garages/entities/garage-photo.entity'
import { Review } from '@root/modules/reviews/entities/review.entity'
import { Booking } from '@root/modules/bookings/entities/booking.entity'
import { BookingRequest } from '@root/modules/booking_requests/entities/booking-requests.entity'
import { District } from '@root/modules/locations/entities/district.entity'
import { Location } from '@root/modules/locations/entities/locations.entity'

export const AppDataSource = new DataSource({
  connectorPackage: 'mysql2',
  type: 'mysql',
  host: env_host_db,
  port: env_port_db,
  username: env_username_db,
  password: env_password_db,
  database: env_database_db,
  synchronize: env_node === 'test',
  logging: false,
  dropSchema: env_node === 'test',
  entities: [
    User,
    Garage,
    GaragePhoto,
    Review,
    Booking,
    BookingRequest,
    Location,
    District,
    Role
  ],
  subscribers: [],
  migrations: []
})
