import { Outlet } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable'

function App() {
  return (
    // <div className='relative grid h-dvh max-h-dvh w-full overflow-x-auto overflow-y-hidden xl:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] xl:overflow-x-hidden'>
    //   <Sidebar />
    //   <div className='relative flex min-h-0 flex-col'>
    //     <SidebarMobile />
    //     <div className='flex h-dvh max-h-dvh min-h-0 flex-1 flex-col overflow-hidden bg-grey-bg'>
    //       <main className='flex-1 overflow-y-auto'>
    //         <div className='flex flex-col gap-4 pt-20 px-4 lg:gap-6 lg:p-6 2xl:p-8'>
    //           <Outlet />
    //         </div>
    //       </main>
    //     </div>
    //   </div>
    // </div>
    <main className='relative flex min-h-dvh'>
      <ResizablePanelGroup
        direction='horizontal'
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`
        }}
        className='h-full max-h-dvh min-h-dvh'
      >
        <Sidebar />
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80} minSize={30} className='bg-grey-bg'>
          <div className='h-dvh overflow-y-auto p-4 md:p-6 2xl:p-8'>
            <Outlet />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  )
}

export default App
