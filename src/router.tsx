import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import SignInPage from './features/auth/pages/SignInPage'
import DashboardPage from './features/dashboard/pages/DashboardPage'
import { DptPage } from './features/dpt/pages/DptPage'
import VotePage from './features/vote/pages/VotePage'

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
      },
      {
        path: '/input-vote',
        element: <VotePage />
      }
    ]
  },
  {
    path: '/sign-in',
    element: <SignInPage />
  }
])
