import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('access_token')
  const { pathname } = useLocation()

  if (!token && pathname === '/') return <Navigate to='/quick-count' />
  if (!token) return <Navigate to='/sign-in' />

  return <>{children}</>
}

export default PrivateRoute
