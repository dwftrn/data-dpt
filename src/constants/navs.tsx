import { LayoutDashboard, UserRoundPen, UsersRound } from 'lucide-react'

export type TSidebarItem = {
  label: string
  icon: React.JSX.Element
  href: string
}

export const navs: TSidebarItem[] = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard />,
    href: '/'
  },
  {
    label: 'Pemilu',
    icon: <UsersRound />,
    href: '/pemilu'
  },
  {
    label: 'Input Suara',
    icon: <UserRoundPen />,
    href: '/pemilu'
  }
]
