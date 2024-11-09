import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashboardDesktop from '../components/DashboardDesktop'
import DashboardMobile from './DashboardMobile'

const DashboardPage = () => {
  const [isMobile, setIsMobile] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    // Initial check
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px is a common breakpoint for mobile
    }

    // Check on mount
    checkIfMobile()

    // Add resize listener
    window.addEventListener('resize', checkIfMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  if (pathname === '/') return <DashboardDesktop />

  if (isMobile) return <DashboardMobile />

  return <DashboardDesktop />
}

export default DashboardPage
