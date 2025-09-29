import { createBrowserRouter } from 'react-router'
import { Landing } from '../modules/landing/pages/Landing'
import ErrorPage from './pages/ErrorPage'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <ErrorPage />
  }
])
