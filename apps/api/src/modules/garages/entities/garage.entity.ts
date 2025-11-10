import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne
} from 'typeorm'
import { GaragePhoto } from './garage-photo.entity'
import { User } from '@users/entities/user.entity'
import { BookingRequest } from '@root/modules/booking_requests/entities/booking-requests.entity'
import { RentMode } from './rent_modes.entity'
import { Location } from '@locations/entities/locations.entity'

@Entity('tb_garages')
export class Garage {
  @PrimaryGeneratedColumn('increment', { name: 'garage_id' })
  id!: number

  @ManyToOne(() => User, (user) => user.garages)
  @JoinColumn({ name: 'owner_id' })
  user!: User

  @ManyToOne(() => RentMode, (rentMode) => rentMode.garages)
  @JoinColumn({ name: 'rent_mode_id' })
  rentMode!: RentMode

  @OneToMany(() => BookingRequest, (bookingRequest) => bookingRequest.garage)
  bookingRequests!: BookingRequest[]

  @OneToOne(() => Location, (location) => location.garage)
  location!: Location

  @Column({
    type: 'decimal',
    name: 'garage_price',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value)
    }
  })
  price!: number

  @Column({ type: 'text', name: 'garage_description' })
  description!: string

  @OneToMany(() => GaragePhoto, (garagePhoto) => garagePhoto.garage)
  photos!: GaragePhoto[]

  @Column({ type: 'boolean', name: 'garage_covered' })
  covered!: boolean

  @Column({ type: 'boolean', name: 'garage_has_cameras' })
  hasCameras!: boolean

  @Column({ type: 'text', name: 'garage_restrictions' })
  restrictions!: string

  @Column({ type: 'boolean', name: 'garage_state', default: true })
  state!: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
