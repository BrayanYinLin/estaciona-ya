import { RoleDto, RoleWithPermissionsDto } from './schemas/response_role.schema'

export interface RoleRepository {
  findRoleByName(name: string): Promise<RoleDto | null>
  findRoleByIdWithPermissions(
    id: number
  ): Promise<RoleWithPermissionsDto | null>
  findRoleByNameWithPermissions(
    name: string
  ): Promise<RoleWithPermissionsDto | null>
}
