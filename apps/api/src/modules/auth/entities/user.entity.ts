import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { Role } from '@roles/entities/role.entity'
import { Garage } from '@root/modules/garages/entities/garage.entity'
import { Booking } from '@root/modules/bookings/entities/booking.entity'

@Entity('tb_users')
export class User {
  @PrimaryGeneratedColumn('increment', { name: 'user_id' })
  id!: number

  @Column({ type: 'varchar', name: 'user_name' })
  name!: string

  @Column({ type: 'varchar', unique: true, name: 'user_email' })
  email!: string

  @Column({ type: 'varchar', name: 'user_password' })
  password!: string

  @Column({ type: 'char', length: 8, name: 'user_dni' })
  dni!: string

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'user_role_id' })
  role!: Role

  @Column({ type: 'boolean', default: true, name: 'user_state' })
  state!: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  @OneToMany(() => Garage, (garage) => garage.user)
  garages!: Garage[]

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings!: Booking[]
}
