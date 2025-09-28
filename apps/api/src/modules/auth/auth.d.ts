export interface AuthService {
  createTenant(tenant: CreateUserDtoType): Promise<void>
}
