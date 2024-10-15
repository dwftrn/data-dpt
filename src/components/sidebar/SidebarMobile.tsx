import { navs } from '@/constants/navs'
import { Menu } from 'lucide-react'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import SidebarItem from './SidebarItem'

const SidebarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='shrink-0 xl:hidden absolute top-5 left-5'>
          <Menu className='size-5' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='flex flex-col'>
        <SheetHeader className='hidden'>
          <SheetTitle className='sr-only' />
          <SheetDescription className='sr-only' />
        </SheetHeader>
        <nav data-mobile={true} className='group grid gap-2 text-lg font-medium'>
          <a href='#' className='flex items-center gap-2 text-lg font-semibold'>
            <span>DATA DPT Cimahi</span>
          </a>
          {navs.map((nav) => (
            <SidebarItem key={nav.label} nav={nav} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default SidebarMobile
