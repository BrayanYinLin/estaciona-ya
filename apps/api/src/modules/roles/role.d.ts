import { Role } from './entities/role.entity'
import { RoleDto } from './schemas/response_role.schema'

export interface RoleRepository {
  findRoleByName(name: string): Promise<RoleDto | null>
  findRoleByIdWithPermissions(id: number): Promise<Role | null>
  findRoleByNameWithPermissions(name: string): Promise<Role | null>
}
