import { Booking } from '@root/modules/bookings/entities/booking.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity('tb_reviews')
export class Review {
  @PrimaryGeneratedColumn('increment', { name: 'review_id' })
  id!: number

  @ManyToOne(() => Booking, (booking) => booking.garage)
  @JoinColumn({ name: 'booking_id' })
  booking!: Booking

  @Column({ type: 'int', name: 'rating' })
  rating!: number

  @Column({ type: 'text', name: 'review_text' })
  text!: string
}
