import { Box, CornerDownRight, History, LayoutDashboard, Tv, UsersRound, View } from 'lucide-react'

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
  },
  {
    label: 'Monitoring',
    icon: <Tv />,
    href: '/monitoring'
  },
  {
    label: 'Data Saksi',
    icon: <View />,
    href: '/saksi'
  },
  {
    label: 'Histori',
    icon: <History />,
    href: '/histori'
  }
]
