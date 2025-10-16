import {
  AccessToken,
  AuthService,
  AuthenticationResponseType
} from '@auth/auth'
import { ROLES } from '@shared/constants/roles'
import { JwtUtils } from '@auth/utils/jwt.utils'
import { compare, hash } from 'bcrypt'
import { env_bcrypt_salt_rounds } from '@shared/config/env.config'
import { DomainError } from '@shared/utils/error'
import { LoginUserDto } from './schemas/login_user.schema'
import { RegisterUserDto } from './schemas/register_user.schema'
import { UserRepository } from '@users/user'
import { DOMAIN_ERRORS } from '@shared/constants/domain.code'
import { RoleRepository } from '@roles/role'
import { RefreshTokenPayload } from './schemas/token.schema'

export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository
  ) {}

  async refresh(jwt: RefreshTokenPayload): Promise<AccessToken> {
    const userFound = await this.userRepository.findUserById(jwt.id)

    if (!userFound) {
      throw new DomainError({
        code: DOMAIN_ERRORS.ENTITY_NOT_FOUND.code,
        message: 'Usuario not encontrado'
      })
    }

    const access_token = JwtUtils.generateAccessJwt({
      id: userFound.id,
      state: userFound.state,
      validatedAccount: userFound.validatedAccount,
      role: {
        name: userFound.role.name
      }
    })

    return {
      access_token
    }
  }

  async login(user: LoginUserDto): Promise<AuthenticationResponseType> {
    const userFound = await this.userRepository.findUserByEmail(user.email)

    if (!userFound) {
      throw new DomainError({
        code: DOMAIN_ERRORS.ENTITY_NOT_FOUND.code,
        message: 'Usuario not encontrado'
      })
    }

    const isCorrect = await compare(user.password, userFound.password)

    if (!isCorrect) {
      throw new DomainError({
        code: DOMAIN_ERRORS.INCORRECT_PASSWORD.code,
        message: 'Contraseña incorrecta'
      })
    }

    const access_token = JwtUtils.generateAccessJwt({
      id: userFound.id,
      state: userFound.state,
      validatedAccount: userFound.validatedAccount,
      role: {
        name: userFound.role.name
      }
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
    lessor: RegisterUserDto
  ): Promise<AuthenticationResponseType> {
    const role = await this.roleRepository.findRoleByName(ROLES.LESSOR)

    if (!role) {
      throw new DomainError({
        code: DOMAIN_ERRORS.ENTITY_NOT_FOUND.code,
        message: 'Rol not encontrado'
      })
    }

    const userFoundByEmail = await this.userRepository.findUserByEmail(
      lessor.email
    )

    if (userFoundByEmail) {
      throw new DomainError({
        code: DOMAIN_ERRORS.CONFLICT.code,
        message: 'El correo ya esta siendo utilizado'
      })
    }

    const userFoundByDni = await this.userRepository.findUserByDni(lessor.dni)

    if (userFoundByDni) {
      throw new DomainError({
        code: DOMAIN_ERRORS.CONFLICT.code,
        message: 'El documento ya esta siendo utilizado'
      })
    }

    const passwordHashed = await hash(lessor.password, env_bcrypt_salt_rounds)

    const userCreated = await this.userRepository.saveUser({
      ...lessor,
      password: passwordHashed,
      role: role
    })

    const access_token = JwtUtils.generateAccessJwt({
      id: userCreated.id,
      state: userCreated.state,
      validatedAccount: userCreated.validatedAccount,
      role: {
        name: userCreated.role.name
      }
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
    tenant: RegisterUserDto
  ): Promise<AuthenticationResponseType> {
    const role = await this.roleRepository.findRoleByName(ROLES.TENANT)
    if (!role) {
      throw new DomainError({
        code: DOMAIN_ERRORS.ENTITY_NOT_FOUND.code,
        message: 'Role not encontrado'
      })
    }

    const userFoundByEmail = await this.userRepository.findUserByEmail(
      tenant.email
    )

    if (userFoundByEmail) {
      throw new DomainError({
        code: DOMAIN_ERRORS.CONFLICT.code,
        message: 'El correo ya esta siendo utilizado'
      })
    }

    const userFoundByDni = await this.userRepository.findUserByDni(tenant.dni)

    if (userFoundByDni) {
      throw new DomainError({
        code: DOMAIN_ERRORS.CONFLICT.code,
        message: 'El documento ya esta siendo utilizado'
      })
    }

    const passwordHashed = await hash(tenant.password, env_bcrypt_salt_rounds)

    const userCreated = await this.userRepository.saveUser({
      ...tenant,
      password: passwordHashed,
      role: role
    })

    const access_token = JwtUtils.generateAccessJwt({
      id: userCreated.id,
      state: userCreated.state,
      validatedAccount: userCreated.validatedAccount,
      role: {
        name: userCreated.role.name
      }
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
