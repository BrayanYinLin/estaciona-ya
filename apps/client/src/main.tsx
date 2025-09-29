import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { routes } from './shared/routes'

const root = document.getElementById('root')!
createRoot(root).render(<RouterProvider router={routes} />)
