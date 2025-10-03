import { LinkAvatar } from '@shared/components/LinkAvatar'
import { MenuIcon } from '@shared/components/MenuIcon'
import { Link } from 'react-router'

export function LessorNavbar({ profilePic }: { profilePic: string | null }) {
  return (
    <nav className="w-full navbar">
      <div className="flex-1">
        <LinkAvatar photo={profilePic} className="w-16" />
      </div>
      <div className="hidden md:block flex-none">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link to="/lessor/requests" className="px-4">
              Solicitudes
            </Link>
          </li>
          <li>
            <Link to="/lessor/bookings" className="px-4">
              Reservas
            </Link>
          </li>
          <li>
            <Link to="/lessor/garages" className="px-4">
              Espacios
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end md:hidden">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <MenuIcon />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/lessor/requests" className="px-4">
                Solicitudes
              </Link>
            </li>
            <li>
              <Link to="/lessor/bookings" className="px-4">
                Reservas
              </Link>
            </li>
            <li>
              <Link to="/lessor/garages" className="px-4">
                Espacios
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
