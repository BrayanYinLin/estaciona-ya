import { createBrowserRouter } from 'react-router'
import { Landing } from '../modules/landing/pages/Landing'
import ErrorPage from './pages/ErrorPage'
import { Register } from '../modules/auth/pages/Register'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <ErrorPage />
  },
  {
    path: '/sign-up',
    element: <Register />
  }
])
