import Logo from '@/assets/logo.svg'
import { navs } from '@/constants/navs'
import { cn } from '@/lib/utils'
import { LogOut } from 'lucide-react'
import { useState } from 'react'
import { ResizablePanel } from '../ui/resizable'
import SidebarItem from './SidebarItem'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { buttonVariants } from '../ui/button'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    // <div className='sticky left-0 top-0 hidden border-r xl:block'>
    //   <div className='flex h-full max-h-screen flex-col gap-2'>
    //     <div className='flex h-14 items-center justify-between border-b px-4 lg:h-[60px] lg:px-6'>
    //       <a href='/' className='flex items-center gap-2 font-semibold'>
    //         Qitara
    //       </a>
    //       <p className='text-xs'>v.1.0.0</p>
    //     </div>
    //     <div className='flex-1'>
    //       <nav className='group grid items-start px-2 text-sm font-medium lg:px-4'>
    //         {navs.map((nav) => (
    //           <SidebarItem key={nav.label} nav={nav} />
    //         ))}
    //       </nav>
    //     </div>
    //   </div>
    // </div>
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
        className={cn('flex h-14 items-center justify-between border-b px-4 lg:h-[60px] lg:px-6', {
          '!p-0': isCollapsed
        })}
      >
        <a href='/' className='flex items-center gap-2 font-semibold'>
          {/* {isCollapsed ? <Box /> : 'Qitara'} */}
          <img alt='logo' src={Logo} className='object-cover size-6' />
          {!isCollapsed && 'Qitara'}
        </a>
        {!isCollapsed && <p className='text-xs'>v.1.0.0</p>}
      </div>
      <div className='flex flex-1 flex-col justify-between h-full'>
        <nav className='group grid items-start px-2 text-sm font-medium lg:px-4'>
          {navs.map((nav) => (
            <SidebarItem key={nav.label} nav={nav} isCollapsed={isCollapsed} />
          ))}
        </nav>
        <div className='px-2 lg:px-4'>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div
                role='button'
                className='flex items-center gap-3 rounded-lg px-3 pb-10 transition-all [&>svg]:size-4 group-data-[mobile=true]:[&>svg]:size-5 text-sm text-red-500'
              >
                <LogOut />
                {!isCollapsed && 'Logout'}
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Keluar Aplikasi</AlertDialogTitle>
                <AlertDialogDescription>Anda yakin ingin keluar?</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  className={buttonVariants({ variant: 'destructive' })}
                  onClick={() => {
                    localStorage.clear()
                    location.reload()
                  }}
                >
                  Keluar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </ResizablePanel>
  )
}

export default Sidebar
