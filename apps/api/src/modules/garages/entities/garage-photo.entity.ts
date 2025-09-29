import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn
} from 'typeorm'
import { Garage } from './garage.entity'

@Entity('tb_garage_photos')
export class GaragePhoto {
  @PrimaryGeneratedColumn('increment', { name: 'garage_photo_id' })
  id!: number

  @ManyToOne(() => Garage, (garage) => garage.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'garage_id' })
  garage!: Garage

  @Column({ type: 'varchar', name: 'garage_url' })
  url!: string
}
