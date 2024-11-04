import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import TanstackProvider from './components/TanstackProvider.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'
import './index.css'
import { router } from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <TanstackProvider>
    <TooltipProvider>
      <RouterProvider router={router} />
      <Toaster richColors toastOptions={{}} />
    </TooltipProvider>
  </TanstackProvider>
)
