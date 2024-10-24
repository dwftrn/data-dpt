import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('access_token')

  if (!token) return <Navigate to='/sign-in' />

  return <>{children}</>
}

export default PrivateRoute