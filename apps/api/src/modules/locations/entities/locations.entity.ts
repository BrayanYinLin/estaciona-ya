import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn
} from 'typeorm'
import { District } from './district.entity'
import { Garage } from '@garages/entities/garage.entity'

@Entity('tb_locations')
export class Location {
  @PrimaryGeneratedColumn('increment', { name: 'location_id' })
  id!: number

  @Column({ type: 'varchar', name: 'location_address' })
  address!: string

  @Column({ type: 'decimal', name: 'location_latitude' })
  city!: number

  @Column({ type: 'decimal', name: 'location_longitude' })
  longitude!: number

  @ManyToOne(() => District, (district) => district.locations)
  @JoinColumn({ name: 'district_id' })
  district!: District

  @OneToOne(() => Garage)
  @JoinColumn({ name: 'garage_id' })
  garage!: Garage
}
