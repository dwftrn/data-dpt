/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MonitoringPage from './features/monitoring/pages/MonitoringPage'
import HistoryPage from './features/history/pages/HistoryPage'

const App = lazy(() => import('./App'))
const PrivateRoute = lazy(() => import('./components/PrivateRoute'))
const SignInPage = lazy(() => import('./features/auth/pages/SignInPage'))
const DashboardPage = lazy(() => import('./features/dashboard/pages/DashboardPage'))
const DptPage = lazy(() => import('./features/dpt/pages/DptPage'))
const PemiluFormPage = lazy(() => import('./features/pemilu/pages/PemiluFormPage'))
const PemiluPage = lazy(() => import('./features/pemilu/pages/PemiluPage'))
const VotePage = lazy(() => import('./features/vote/pages/VotePage'))

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
      },
      {
        path: '/monitoring',
        element: <MonitoringPage />
      },
      {
        path: '/history',
        element: <HistoryPage />
      }
    ]
  },
  {
    path: '/quick-count',
    element: <DashboardPage />
  },
  {
    path: '/sign-in',
    element: <SignInPage />
  }
])
