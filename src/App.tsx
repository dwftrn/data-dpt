import { Outlet } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable'

function App() {
  return (
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
