import { Role } from '@roles/entities/role.entity'
import { AppDataSource } from '../data-source'
import { ROLES } from '@shared/constants/roles'

export async function seedRoles() {
  const roleRepository = AppDataSource.getRepository(Role)

  for (const item of Object.values(ROLES)) {
    const role = await roleRepository.findOneBy({ name: item })

    if (!role) {
      await roleRepository.save({
        name: item
      })
    }
  }
}
