import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn
} from 'typeorm'
import { District } from './district.entity'

@Entity('tb_locations')
export class Location {
  @PrimaryGeneratedColumn('increment', { name: 'location_id' })
  id!: number

  @Column({ type: 'varchar', name: 'location_address' })
  address!: string

  @Column({ type: 'decimal', name: 'location_latitude' })
  latitude!: number

  @Column({ type: 'decimal', name: 'location_longitude' })
  longitude!: number

  @ManyToOne(() => District, (district) => district.locations)
  @JoinColumn({ name: 'district_id' })
  district!: District
}
