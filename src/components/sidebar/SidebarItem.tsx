import { TSidebarItem } from '@/constants/navs'
import { cn } from '@/lib/utils'
import { NavLink } from 'react-router-dom'

type Props = {
  nav: TSidebarItem
  isCollapsed: boolean
}

const SidebarItem = ({ nav, isCollapsed }: Props) => {
  return (
    <NavLink
      to={nav.href}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 transition-all [&>svg]:size-4 group-data-[mobile=true]:[&>svg]:size-5 opacity-50',
          { 'opacity-100': isActive, 'justify-center': isCollapsed }
        )
      }
    >
      {nav.icon}
      {!isCollapsed && nav.label}
    </NavLink>
  )
}

export default SidebarItem
