import type { UserRole } from '@user/context/user.context'
import { LinkAvatar } from './LinkAvatar'
import { NavBarLinks } from './NavBarLinks'

export function UserNavBar({
  profilePic,
  role,
  initial = '?'
}: {
  profilePic: string | null
  role: UserRole
  initial: string
}) {
  return (
    <>
      <nav className="w-full navbar px-6">
        <div className="flex-1">
          <LinkAvatar photo={profilePic} className="w-16" name={initial} />
        </div>
        <NavBarLinks role={role} />
      </nav>
    </>
  )
}
