import { Award, Box, CornerDownRight, History, LayoutDashboard, Tv, UsersRound, View } from 'lucide-react'

export type TSidebarItem = {
  label: string
  icon: React.JSX.Element
  href: string
  role: number[]
}

export const navs: TSidebarItem[] = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard />,
    role: [1, 0],
    href: '/'
  },
  {
    label: 'Peringkat RW',
    icon: <Award />,
    role: [1],
    href: '/rw-rank'
  },
  {
    label: 'Data DPT',
    icon: <UsersRound />,
    role: [1],
    href: '/dpt'
  },
  {
    label: 'Pemilu',
    icon: <Box />,
    role: [1],
    href: '/pemilu'
  },
  {
    label: 'Input Suara',
    icon: <CornerDownRight />,
    role: [1],
    href: '/input-vote'
  },
  {
    label: 'Monitoring',
    icon: <Tv />,
    role: [1],
    href: '/monitoring'
  },
  {
    label: 'Data Saksi',
    icon: <View />,
    role: [1],
    href: '/saksi'
  },
  {
    label: 'Histori',
    icon: <History />,
    role: [1],
    href: '/history'
  }
]
