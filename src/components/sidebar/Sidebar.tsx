import Logo from '@/assets/logo.svg'
import UserBoxIcon from '@/assets/user-box-icon.svg'
import { navs } from '@/constants/navs'
import { cn } from '@/lib/utils'
import { Settings } from 'lucide-react'
import { useState } from 'react'
import { ResizablePanel } from '../ui/resizable'
import SettingsDialog from './SettingDialog'
import SidebarItem from './SidebarItem'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <ResizablePanel
      defaultSize={20}
      collapsedSize={4}
      collapsible
      minSize={15}
      maxSize={20}
      onCollapse={() => {
        setIsCollapsed(true)
        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
      }}
      onResize={() => {
        setIsCollapsed(false)
        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
      }}
      className={cn('flex flex-col bg-primary-blue-700 text-white sidebar', {
        'min-w-[3.125rem] transition-all duration-300 ease-in-out items-center': isCollapsed
      })}
    >
      <div
        className={cn(
          'flex h-14 items-center justify-between border-b border-b-primary-red-500 px-4 lg:h-[60px] lg:px-6',
          {
            '!p-0': isCollapsed
          }
        )}
      >
        <a href='/' className='flex items-center gap-2 font-semibold'>
          {/* {isCollapsed ? <Box /> : 'Qitara'} */}
          <img alt='logo' src={Logo} className='object-cover size-6' />
          {!isCollapsed && 'Qitara'}
        </a>
        {!isCollapsed && <p className='text-xs'>v.1.0.1</p>}
      </div>
      <div className='flex flex-1 flex-col justify-between h-full'>
        <nav className='group grid items-start px-2 text-sm font-medium lg:px-4 py-4'>
          {navs.map((nav) => (
            <SidebarItem key={nav.label} nav={nav} isCollapsed={isCollapsed} />
          ))}
        </nav>
        <SettingsDialog
          trigger={
            <div className='p-4 lg:p-6'>
              <div className='flex items-center gap-4 text-white'>
                {!isCollapsed && (
                  <>
                    <img alt='icon' src={UserBoxIcon} draggable={false} />
                    <h1 className='hidden text-base font-semibold lg:block'>Administrator</h1>
                  </>
                )}
                <Settings size={24} role='button' className={cn('ml-auto', { 'm-auto': isCollapsed })} />
              </div>
            </div>
          }
        />
      </div>
    </ResizablePanel>
  )
}

export default Sidebar
