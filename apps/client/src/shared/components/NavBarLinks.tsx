import type { UserRole } from '@user/context/user.context'
import { MenuIcon } from './MenuIcon'
import { Link } from 'react-router'
import { NotificationIcon } from './NotificationIcon'
import { useSocket } from '@shared/hooks/useSocket'
import { useEffect, useState } from 'react'

export type NavbarLinksProps = {
  role: UserRole
}

type NotificationData = {
  message: string
  type: 'accepted' | 'rejected' | 'info'
}

export function NavBarLinks({ role }: NavbarLinksProps) {
  const [hasNotification, setHasNotification] = useState(false)
  const [notifications, setNotifications] = useState<NotificationData[]>([])
  const socket = useSocket()

  useEffect(() => {
    const handleNotification = (data: NotificationData) => {
      setHasNotification(true)
      setNotifications((prev) => [...prev, data])
    }

    socket.on('notify:user', handleNotification)

    return () => {
      socket.off('notify:user', handleNotification)
    }
  }, [socket])

  if (role.name === 'lessor') {
    return (
      <>
        <nav className="hidden md:block flex-none">
          <ul className="menu menu-horizontal px-1 gap-2 items-center">
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
            <div className="indicator hover:bg-transparent active:bg-transparent focus:bg-transparent">
              {hasNotification && (
                <span className="indicator-item status status-error" />
              )}
              <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="cursor-pointer px-3">
                  <NotificationIcon color="base-300" />
                </div>
                <ul
                  tabIndex={-1}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  {notifications.map((notification) => (
                    <li key={notification.message}>
                      <Link to="/lessor/requests" className="px-4">
                        {notification.message}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ul>
        </nav>
        <nav className="navbar-end md:hidden">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
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
        </nav>
      </>
    )
  }
  return (
    <>
      <nav className="hidden md:block flex-none">
        <ul className="menu menu-horizontal px-1 gap-2 items-center">
          <li>
            <Link to="/tenant/requests" className="px-4">
              Solicitudes
            </Link>
          </li>
          <li>
            <Link to="/tenant/catalog" className="px-4">
              Ver Catálogo
            </Link>
          </li>
          <div className="indicator hover:bg-transparent active:bg-transparent focus:bg-transparent">
            {hasNotification && (
              <span className="indicator-item status status-error" />
            )}
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="cursor-pointer px-3">
                <NotificationIcon color="base-300" />
              </div>
              <ul
                tabIndex={-1}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                {notifications.map((notification) => (
                  <li key={notification.message}>
                    <Link to="/lessor/requests" className="px-4">
                      {notification.message}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ul>
      </nav>
      <nav className="navbar-end md:hidden">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <MenuIcon />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/tenant/requests" className="px-4">
                Solicitudes
              </Link>
            </li>
            <li>
              <Link to="/tenant/catalog" className="px-4">
                Ver Catálogo
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
