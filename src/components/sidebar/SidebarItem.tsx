import { TSidebarItem } from '@/constants/navs'
import { cn } from '@/lib/utils'
import { NavLink } from 'react-router-dom'

type Props = {
  nav: TSidebarItem
}

const SidebarItem = ({ nav }: Props) => {
  return (
    <NavLink
      to={nav.href}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 transition-all [&>svg]:size-4 group-data-[mobile=true]:[&>svg]:size-5',
          { '': isActive }
        )
      }
    >
      {nav.icon}
      {nav.label}
    </NavLink>
  )
}

export default SidebarItem
