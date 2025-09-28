import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from 'typeorm'
import { User } from '@auth/entities/user.entity'

@Entity('tb_roles')
export class Role {
  @PrimaryGeneratedColumn('increment', { name: 'role_id' })
  id!: number

  @Column({ type: 'varchar', name: 'role_name' })
  name!: string

  @OneToMany(() => User, (user) => user.role)
  users!: User[]
}
