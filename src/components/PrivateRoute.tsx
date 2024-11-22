import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('access_token')
  const { pathname } = useLocation()
  const role = Number(localStorage.getItem('user_role'))

  console.log({ role })

  // if (!token && pathname === '/') return <Navigate to='/quick-count' />
  if (role === 0 && pathname !== '/') return <Navigate to='/' />
  if (!token) return <Navigate to='/sign-in' />

  return <>{children}</>
}

export default PrivateRoute
