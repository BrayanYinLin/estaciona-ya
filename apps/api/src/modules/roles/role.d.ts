import { RoleDto } from './schemas/response_role.schema'

export interface RoleRepository {
  findRoleByName(name: string): Promise<RoleDto | null>
}
