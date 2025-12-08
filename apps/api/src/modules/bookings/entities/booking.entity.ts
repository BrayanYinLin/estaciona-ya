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

export enum BookingStatus {
  PENDING_PAYMENT = 'pending_payment',
  CANCELLED = 'cancelled',
  PAID = 'paid',
  COMPLETED = 'completed',
  EXPIRED = 'expired'
}

@Entity('tb_bookings')
export class Booking {
  @PrimaryGeneratedColumn('increment', { name: 'booking_id' })
  id!: number

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'tenant_id' })
  user!: User

  @ManyToOne(() => Garage, (garage) => garage.bookingRequests)
  @JoinColumn({ name: 'garage_id' })
  garage!: Garage

  @Column({ type: 'datetime', name: 'start_dt' })
  startDate!: Date

  @Column({ type: 'datetime', name: 'end_dt' })
  endDate!: Date

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING_PAYMENT
  })
  status!: BookingStatus

  @Column({
    type: 'decimal',
    name: 'total'
  })
  total!: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
