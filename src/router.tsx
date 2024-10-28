import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import PrivateRoute from './components/PrivateRoute'
import SignInPage from './features/auth/pages/SignInPage'
import DashboardPage from './features/dashboard/pages/DashboardPage'
import { DptPage } from './features/dpt/pages/DptPage'
import PemiluFormPage from './features/pemilu/pages/PemiluFormPage'
import PemiluPage from './features/pemilu/pages/PemiluPage'
import VotePage from './features/vote/pages/VotePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
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
        path: '/pemilu',
        element: <PemiluPage />
      },
      {
        path: '/pemilu/form/:id?',
        element: <PemiluFormPage />
      },
      {
        path: '/input-vote/:id?',
        element: <VotePage />
      }
    ]
  },
  {
    path: '/sign-in',
    element: <SignInPage />
  }
])
