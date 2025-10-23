import { Repository } from 'typeorm'
import { AuthenticationCodeRepository } from './auth'
import {
  AuthenticationCodeDto,
  CreateCodeSchema
} from './schemas/authetication_code.schema'
import { AuthenticationCode } from './entities/authentication_code.entity'

export class AuthenticationCodeRepositoryImpl
  implements AuthenticationCodeRepository
{
  constructor(private readonly repository: Repository<AuthenticationCode>) {}

  async deleteCode(id: number): Promise<boolean> {
    const { affected } = await this.repository.delete({
      id
    })

    return Boolean(affected)
  }

  async findCodeByUserId(id: number): Promise<AuthenticationCodeDto | null> {
    const codeFound = await this.repository.findOne({
      where: {
        user: {
          id
        }
      },
      relations: {
        user: true
      }
    })

    return codeFound
  }

  async saveCode({
    code,
    reason,
    user
  }: CreateCodeSchema): Promise<AuthenticationCodeDto> {
    const codeCreated = await this.repository.save({
      code,
      reason,
      user
    })

    return codeCreated
  }
}
