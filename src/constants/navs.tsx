import { Box, CornerDownRight, LayoutDashboard, UsersRound } from 'lucide-react'

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
    label: 'Data DPT',
    icon: <UsersRound />,
    href: '/dpt'
  },
  {
    label: 'Pemilu',
    icon: <Box />,
    href: '/pemilu'
  },
  {
    label: 'Input Suara',
    icon: <CornerDownRight />,
    href: '/input-vote'
  }
]
