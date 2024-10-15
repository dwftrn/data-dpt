import { Outlet } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'
import SidebarMobile from './components/sidebar/SidebarMobile'

function App() {
  return (
    <div className='relative grid h-dvh max-h-dvh w-full overflow-x-auto overflow-y-hidden xl:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] xl:overflow-x-hidden'>
      <Sidebar />
      <div className='relative flex min-h-0 flex-col'>
        <SidebarMobile />
        <div className='flex h-dvh max-h-dvh min-h-0 flex-1 flex-col overflow-hidden'>
          <main className='flex-1 overflow-y-auto'>
            <div className='flex flex-col gap-4 pt-20 px-10 xl:py-4 lg:gap-6 lg:py-6'>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
