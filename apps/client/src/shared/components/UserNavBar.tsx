import type { UserRole } from '@user/context/user.context'
import { LinkAvatar } from './LinkAvatar'
import { NavBarLinks } from './NavBarLinks'

export function UserNavBar({
  profilePic,
  role
}: {
  profilePic: string | null
  role: UserRole
}) {
  return (
    <>
      <nav className="w-full navbar">
        <div className="flex-1">
          <LinkAvatar photo={profilePic} className="w-16" />
        </div>
        <NavBarLinks role={role} />
      </nav>
    </>
  )
}
