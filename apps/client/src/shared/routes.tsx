import { createBrowserRouter } from 'react-router'
import { Landing } from '../modules/landing/pages/Landing'
import ErrorPage from './pages/ErrorPage'
import { Register } from '../modules/auth/pages/Register'
import { LogIn } from '../modules/auth/pages/LogIn'
import { Dashboard } from '../modules/lessor/pages/Dashboard'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <ErrorPage />
  },
  {
    path: '/sign-up',
    element: <Register />
  },
  {
    path: '/sign-in',
    element: <LogIn />
  },
  {
    path: '/dashboard/lessor',
    element: <Dashboard />
  }
])
