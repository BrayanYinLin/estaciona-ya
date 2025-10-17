import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne
} from 'typeorm'
import { User } from '@users/entities/user.entity'

export enum AuthenticationReason {
  VALIDATE_ACCOUNT = 'VALIDATE_ACCOUNT',
  ACTIVATE_ACCOUNT = 'ACTIVATE_ACCOUNT'
}

@Entity('tb_authentication_codes')
export class AuthenticationCode {
  @PrimaryGeneratedColumn('increment', { name: 'validation_code_id' })
  id!: number

  @ManyToOne(() => User, (User) => User.authenticationCodes)
  @JoinColumn({ name: 'user_id' })
  user!: User

  @Column({ type: 'uuid', name: 'authentication_code' })
  code!: string

  @Column({
    type: 'enum',
    enum: AuthenticationReason,
    name: 'reason',
    default: AuthenticationReason.VALIDATE_ACCOUNT
  })
  reason!: AuthenticationReason
}
