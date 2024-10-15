import { navs } from '@/constants/navs'
import SidebarItem from './SidebarItem'

const Sidebar = () => {
  return (
    <div className='sticky left-0 top-0 hidden border-r xl:block'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center justify-between border-b px-4 lg:h-[60px] lg:px-6'>
          <a href='/' className='flex items-center gap-2 font-semibold'>
            {/* <img src={Logo} alt='logo' width={100} draggable={false} /> */}
            DATA DPT Cimahi
          </a>
          <p className='text-xs'>v.1.0.0</p>
        </div>
        <div className='flex-1'>
          <nav className='group grid items-start px-2 text-sm font-medium lg:px-4'>
            {navs.map((nav) => (
              <SidebarItem key={nav.label} nav={nav} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
