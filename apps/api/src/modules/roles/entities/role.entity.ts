import {
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from 'typeorm'
import { User } from '@users/entities/user.entity'
import { Permission } from './permission.entity'

@Entity('tb_roles')
export class Role {
  @PrimaryGeneratedColumn('increment', { name: 'role_id' })
  id!: number

  @Column({ type: 'varchar', name: 'role_name' })
  name!: string

  @OneToMany(() => User, (user) => user.role)
  users?: User[]

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'tb_role_permissions',
    joinColumns: [{ name: 'role_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'permission_id', referencedColumnName: 'id' }]
  })
  permissions!: Permission[]
}
