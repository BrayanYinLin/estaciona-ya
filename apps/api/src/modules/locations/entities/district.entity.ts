import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Location } from './locations.entity'

@Entity('tb_districts')
export class District {
  @PrimaryGeneratedColumn('increment', { name: 'district_id' })
  id!: number

  @Column({ type: 'text', unique: true, name: 'district_name' })
  name!: string

  @OneToMany(() => Location, (location) => location.district)
  locations!: Location[]
}
