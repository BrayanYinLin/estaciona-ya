import { Repository } from 'typeorm'
import { RoleRepository } from './role'
import { Role } from './entities/role.entity'
import { RoleDto, RoleWithPermissionsDto } from './schemas/response_role.schema'

export class RoleRepositoryImpl implements RoleRepository {
  constructor(private readonly repository: Repository<Role>) {}

  async findRoleByNameWithPermissions(
    name: string
  ): Promise<RoleWithPermissionsDto | null> {
    const role = await this.repository.findOne({
      where: { name },
      relations: {
        permissions: true
      }
    })

    if (!role) return null

    const { id, name: nameRecovered, permissions } = role

    return {
      id,
      name: nameRecovered,
      permissions
    }
  }

  async findRoleByIdWithPermissions(
    id: number
  ): Promise<RoleWithPermissionsDto | null> {
    const role = await this.repository.findOne({
      where: { id },
      relations: {
        permissions: true
      }
    })

    if (!role) return null

    const { id: idRecovered, name, permissions } = role

    return {
      id: idRecovered,
      name,
      permissions
    }
  }

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
