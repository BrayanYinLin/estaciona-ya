import { NavBarLinks } from '@shared/components/NavBarLinks'
import type { UserRole } from '@user/context/user.context'

export function ProfileHeader({
  name,
  role,
  profilePic
}: {
  name: string
  role: UserRole
  profilePic: string | null
}) {
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <section className="flex items-center gap-4">
        <img
          src={profilePic ?? 'https://placehold.co/150x150'}
          alt=""
          className="rounded-full h-16 w-16 object-cover"
        />
        <h1 className="text-2xl font-semibold">{name}</h1>
        <div className="badge badge-neutral">
          {role === 'lessor' ? 'Arrendador' : 'Arrendatario'}
        </div>
      </section>
      <NavBarLinks role={role} />
    </div>
  )
}
