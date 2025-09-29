import { AuthService, AuthenticationResponseType } from '@auth/auth'
import {
  LoginUserDtoType,
  type CreateUserDtoType
} from '@auth/entities/dto/user.dto'
import { User } from '@auth/entities/user.entity'
import { Role } from '@roles/entities/role.entity'
import { AppDataSource } from '@shared/database/data-source'
import { ROLES } from '@shared/constants/roles'
import { JwtUtils } from '@auth/utils/jwt.utils'
import { compare, hash } from 'bcrypt'
import { env_bcrypt_salt_rounds } from '@shared/config/env.config'
import { AppError } from '@shared/utils/error'
import { HTTP_CODES } from '@shared/constants/http.codes'

export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly repository = AppDataSource.getRepository(User),
    private readonly roleRepository = AppDataSource.getRepository(Role)
  ) {}

  async login(user: LoginUserDtoType): Promise<AuthenticationResponseType> {
    const userFound = await this.repository.findOne({
      where: { email: user.email },
      relations: ['role']
    })

    if (!userFound) {
      throw new AppError({
        httpCode: 404,
        message: 'Usuario no encontrado'
      })
    }

    const isCorrect = await compare(user.password, userFound.password)

    if (!isCorrect) {
      throw new AppError({
        httpCode: HTTP_CODES.BAD_GATEWAY,
        message: 'Contraseña incorrecta'
      })
    }

    const access_token = JwtUtils.generateAccessJwt({
      id: userFound.id,
      role: { name: userFound.role.name }
    })
    const refresh_token = JwtUtils.generateRefreshJwt({ id: userFound.id })

    return {
      access_token,
      refresh_token,
      user: {
        id: userFound.id,
        role: {
          name: userFound.role.name
        }
      }
    }
  }

  async createLessor(
    lessor: CreateUserDtoType
  ): Promise<AuthenticationResponseType> {
    const role = await this.roleRepository.findOneBy({ name: ROLES.LESSOR })

    if (!role) {
      throw new AppError({
        httpCode: 404,
        message: 'Role not encontrado'
      })
    }

    const passwordHashed = await hash(lessor.password, env_bcrypt_salt_rounds)

    const userCreated = await this.repository.save({
      ...lessor,
      password: passwordHashed,
      role: role
    })

    const access_token = JwtUtils.generateAccessJwt({
      id: userCreated.id,
      role: { name: userCreated.role.name }
    })
    const refresh_token = JwtUtils.generateRefreshJwt({ id: userCreated.id })

    return {
      access_token,
      refresh_token,
      user: {
        id: userCreated.id,
        role: {
          name: userCreated.role.name
        }
      }
    }
  }

  async createTenant(
    tenant: CreateUserDtoType
  ): Promise<AuthenticationResponseType> {
    const role = await this.roleRepository.findOneBy({ name: ROLES.TENANT })

    if (!role) {
      throw new AppError({
        httpCode: 404,
        message: 'Role not encontrado'
      })
    }

    const passwordHashed = await hash(tenant.password, env_bcrypt_salt_rounds)

    const userCreated = await this.repository.save({
      ...tenant,
      password: passwordHashed,
      role: role
    })

    const access_token = JwtUtils.generateAccessJwt({
      id: userCreated.id,
      role: { name: userCreated.role.name }
    })
    const refresh_token = JwtUtils.generateRefreshJwt({ id: userCreated.id })

    return {
      access_token,
      refresh_token,
      user: {
        id: userCreated.id,
        role: {
          name: userCreated.role.name
        }
      }
    }
  }
}
