import { JwtUserDtoType } from '@auth/entities/dto/user.dto'
import { sign } from 'jsonwebtoken'
import { env_jwt } from '@shared/config/env.config'

export const generateAccesToken = (user: JwtUserDtoType) => {
  // magic string - corregir
  const token = sign(user, env_jwt, {
    algorithm: 'HS256',
    expiresIn: '8h'
  })

  return token
}
