import { AuthenticationTokens, AuthService } from '@auth/auth'
import { type CreateUserDtoType } from '@auth/entities/dto/user.dto'
import { User } from '@auth/entities/user.entity'
import { Role } from '@roles/entities/role.entity'
import { AppDataSource } from '@shared/database/data-source'
import { ROLES } from '@shared/constants/roles'
import { JwtUtils } from '@auth/utils/jwt.utils'
import { hash } from 'bcrypt'
import { env_bcrypt_salt_rounds } from '@shared/config/env.config'

export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly repository = AppDataSource.getRepository(User),
    private readonly roleRepository = AppDataSource.getRepository(Role)
  ) {}

  async createTenant(tenant: CreateUserDtoType): Promise<AuthenticationTokens> {
    const role = await this.roleRepository.findOne({
      where: {
        name: ROLES.TENANT
      }
    })

    if (!role) {
      throw new Error('Role not found')
    }

    const passwordHashed = await hash(tenant.password, env_bcrypt_salt_rounds)

    const userCreated = await this.repository.save({
      ...tenant,
      password: passwordHashed,
      role: role
    })

    const access_token = JwtUtils.generateAccessJwt({ id: userCreated.id })
    const refresh_token = JwtUtils.generateRefreshJwt({ id: userCreated.id })

    return {
      access_token,
      refresh_token
    }
  }
}
