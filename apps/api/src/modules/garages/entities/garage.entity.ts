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
import { User } from '@auth/entities/user.entity'
import { BookingRequest } from '@root/modules/booking_requests/entities/booking-requests.entity'

@Entity('tb_garages')
export class Garage {
  @PrimaryGeneratedColumn('increment', { name: 'garage_id' })
  id!: number

  // location_id
  @ManyToOne(() => User, (user) => user.garages)
  @JoinColumn({ name: 'owner_id' })
  user!: User

  @OneToMany(() => BookingRequest, (bookingRequest) => bookingRequest.garage)
  bookingRequests!: BookingRequest[]

  @Column({ type: 'decimal', name: 'garage_price' })
  price!: number

  @Column({ type: 'varchar', name: 'garage_description' })
  description!: string

  @OneToMany(() => GaragePhoto, (garagePhoto) => garagePhoto.garage)
  garagePhotos!: GaragePhoto[]

  @Column({ type: 'boolean', name: 'garage_covered' })
  covered!: boolean

  @Column({ type: 'boolean', name: 'garage_has_cameras' })
  hasCameras!: boolean

  @Column({ type: 'varchar', name: 'garage_restrictions' })
  restrictions!: string

  @Column({ type: 'boolean', name: 'garage_state' })
  state!: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
