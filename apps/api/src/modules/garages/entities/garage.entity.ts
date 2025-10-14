import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { GaragePhoto } from './garage-photo.entity'
import { User } from '@users/entities/user.entity'
import { BookingRequest } from '@root/modules/booking_requests/entities/booking-requests.entity'
import { RentMode } from './rent_modes.entity'

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

  @Column({ type: 'decimal', name: 'garage_price' })
  price!: number

  @Column({ type: 'text', name: 'garage_description' })
  description!: string

  @OneToMany(() => GaragePhoto, (garagePhoto) => garagePhoto.garage)
  garagePhotos!: GaragePhoto[]

  @Column({ type: 'boolean', name: 'garage_covered' })
  covered!: boolean

  @Column({ type: 'boolean', name: 'garage_has_cameras' })
  hasCameras!: boolean

  @Column({ type: 'text', name: 'garage_restrictions' })
  restrictions!: string

  @Column({ type: 'boolean', name: 'garage_state' })
  state!: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
