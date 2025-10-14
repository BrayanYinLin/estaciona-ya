import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Garage } from './garage.entity'

@Entity('tb_rent_mode')
export class RentMode {
  @PrimaryGeneratedColumn('increment', { name: 'rent_mode_id' })
  id!: number

  @Column({ type: 'text', name: 'rent_mode_name' })
  mode_name!: string

  @OneToMany(() => Garage, (garage) => garage.rentMode)
  garages!: Garage[]
}
