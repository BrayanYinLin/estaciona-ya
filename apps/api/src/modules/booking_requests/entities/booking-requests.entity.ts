import { User } from '@auth/entities/user.entity'
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

@Entity('tb_booking_requests')
export class BookingRequest {
  @PrimaryGeneratedColumn('increment', { name: 'booking_request_id' })
  id!: number

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'tenant_id' })
  user!: User

  @ManyToOne(() => Garage, (garage) => garage.bookingRequests)
  @JoinColumn({ name: 'garage_id' })
  garage!: Garage[]

  @Column({ type: 'datetime', name: 'start_dt' })
  startDate!: Date

  @Column({ type: 'datetime', name: 'end_dt' })
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
