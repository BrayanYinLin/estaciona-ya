import { In } from 'typeorm'
import { AppDataSource } from '../data-source'
import { PERMISSIONS } from '@shared/constants/permissions'
import { Role } from '@roles/entities/role.entity'
import { Permission } from '@roles/entities/permission.entity'

const lessorPermissions = [
  PERMISSIONS.GARAGES.CREATE,
  PERMISSIONS.GARAGES.DELETE,
  PERMISSIONS.GARAGES.UPDATE,
  PERMISSIONS.GARAGES.READ,
  PERMISSIONS.GARAGES.PHOTO.UPLOAD,
  PERMISSIONS.GARAGES.PHOTO.DELETE
]

const tenantPermissions = [
  PERMISSIONS.BOOKINGS.CANCEL,
  PERMISSIONS.BOOKINGS.CREATE,
  PERMISSIONS.BOOKINGS.READ,
  PERMISSIONS.BOOKINGS.UPDATE,
  PERMISSIONS.GARAGES.READ,
  PERMISSIONS.REVIEWS.CREATE,
  PERMISSIONS.REVIEWS.DELETE,
  PERMISSIONS.REVIEWS.READ,
  PERMISSIONS.REVIEWS.UPDATE
]

const ROLES = {
  lessor: {
    name: 'lessor',
    permissions: lessorPermissions
  },
  tenant: {
    name: 'tenant',
    permissions: tenantPermissions
  }
}

export async function seedRoles() {
  const roleRepository = AppDataSource.getRepository(Role)
  const permissionRepository = AppDataSource.getRepository(Permission)

  for (const permissionName of Object.values(PERMISSIONS).flatMap((p) =>
    typeof p === 'string' ? p : Object.values(p)
  )) {
    const permission = await permissionRepository.findOneBy({
      name: permissionName as string
    })

    if (!permission) {
      await permissionRepository.save({ name: permissionName as string })
    }
  }

  for (const roleData of Object.values(ROLES)) {
    const role = await roleRepository.findOneBy({ name: roleData.name })

    if (!role) {
      const permissions = await permissionRepository.findBy({
        name: In(roleData.permissions)
      })

      await roleRepository.save({
        name: roleData.name,
        permissions
      })
    }
  }
}
