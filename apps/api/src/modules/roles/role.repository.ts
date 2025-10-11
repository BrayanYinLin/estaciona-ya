import { Repository } from 'typeorm'
import { RoleRepository } from './role'
import { Role } from './entities/role.entity'
import { RoleDto } from './schemas/response_role.schema'

export class RoleRepositoryImpl implements RoleRepository {
  constructor(private readonly repository: Repository<Role>) {}

  async findRoleByName(name: string): Promise<RoleDto | null> {
    const role = await this.repository.findOneBy({ name })

    if (!role) return null

    const { id, name: nameRecovered } = role

    return {
      id,
      name: nameRecovered
    }
  }
}
