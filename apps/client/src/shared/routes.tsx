import { createBrowserRouter } from 'react-router'
import { Landing } from '../modules/landing/pages/Landing'
import ErrorPage from './pages/ErrorPage'
import { Register } from '../modules/auth/pages/Register'
import { LogIn } from '../modules/auth/pages/LogIn'
import { RequestsLessor } from '@lessor/pages/RequestsLessor'
import { BookingsLessor } from '@lessor/pages/BookingsLessor'
import { GaragesLessor } from '@lessor/pages/GaragesLessor'
import { CatalogTenant } from '@tenant/pages/CatalogTenant'
import { UserProfile } from '@modules/user/pages/UserProfile'
import { NewGarage } from '@lessor/pages/NewGarage'
import { RequestsTenant } from '@tenant/pages/RequestsTenant'

export const FRONTEND_ROUTES = {
  ROOT: '/',
  SIGNUP: 'sign-up',
  SIGNIN: 'sign-in',

  TENANT: 'tenant',
  TENANT_REQUEST: 'requests',
  TENANT_CATALOG: 'catalog',

  LESSOR: 'lessor',
  LESSOR_REQUEST: 'requests',
  LESSOR_GARAGES: 'garages',
  LESSOR_GARAGES_NEW: 'garages/new',

  LESSOR_BOOKINGS: 'bookings',

  USER_PROFILE: 'profile'
} as const

export const routes = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: FRONTEND_ROUTES.SIGNUP,
        element: <Register />
      },
      {
        path: FRONTEND_ROUTES.SIGNIN,
        element: <LogIn />
      },
      {
        path: FRONTEND_ROUTES.LESSOR,
        children: [
          {
            path: FRONTEND_ROUTES.LESSOR_REQUEST,
            element: <RequestsLessor />
          },
          {
            path: FRONTEND_ROUTES.LESSOR_BOOKINGS,
            element: <BookingsLessor />
          },
          {
            path: FRONTEND_ROUTES.LESSOR_GARAGES,
            element: <GaragesLessor />
          },
          {
            path: FRONTEND_ROUTES.LESSOR_GARAGES_NEW,
            element: <NewGarage />
          }
        ]
      },
      {
        path: FRONTEND_ROUTES.TENANT,
        children: [
          {
            path: FRONTEND_ROUTES.TENANT_CATALOG,
            element: <CatalogTenant />
          },
          {
            path: FRONTEND_ROUTES.TENANT_REQUEST,
            element: <RequestsTenant />
          }
        ]
      },
      {
        path: FRONTEND_ROUTES.USER_PROFILE,
        element: <UserProfile />
      }
    ]
  }
])
