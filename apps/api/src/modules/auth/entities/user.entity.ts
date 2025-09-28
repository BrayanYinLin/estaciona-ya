import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { Role } from '@roles/entities/role.entity'

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

  @Column({ type: 'char', length: 8, name: 'user_password' })
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
}
