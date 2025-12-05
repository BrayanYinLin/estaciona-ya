import { User } from '@users/entities/user.entity'
import { Garage } from '@root/modules/garages/entities/garage.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

export type Status = 'pending' | 'accepted' | 'rejected'

@Entity('tb_booking_requests')
export class BookingRequest {
  @PrimaryGeneratedColumn('increment', { name: 'booking_request_id' })
  id!: number

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'tenant_id' })
  user!: User

  @ManyToOne(() => Garage, (garage) => garage.bookingRequests)
  @JoinColumn({ name: 'garage_id' })
  garage!: Garage

  @Column({
    type: 'datetime',
    name: 'start_dt',
    default: () => 'CURRENT_TIMESTAMP'
  })
  startDate!: Date

  @Column({
    type: 'datetime',
    name: 'end_dt',
    default: () => 'CURRENT_TIMESTAMP'
  })
  endDate!: Date

  @Column({
    type: 'enum',
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  })
  status!: 'pending' | 'accepted' | 'rejected'

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
