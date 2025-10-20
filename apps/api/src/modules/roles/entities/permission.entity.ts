import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Role } from './role.entity'

@Entity('tb_permissions')
export class Permission {
  @PrimaryGeneratedColumn('increment', { name: 'permission_id' })
  id!: number

  @Column({ type: 'varchar', name: 'permission_name' })
  name!: string

  @ManyToMany(() => Role, (role) => role.permissions)
  roles!: Role[]
}
