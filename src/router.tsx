import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { DptPage } from './features/dpt/pages/DptPage'
import SignInPage from './features/auth/pages/SignInPage'
import DashboardPage from './features/dashboard/pages/DashboardPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <DashboardPage />
      },
      {
        path: '/dpt',
        element: <DptPage />
      }
    ]
  },
  {
    path: '/sign-in',
    element: <SignInPage />
  }
])
