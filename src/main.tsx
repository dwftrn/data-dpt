import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import TanstackProvider from './components/TanstackProvider.tsx'
import './index.css'
import { router } from './router.tsx'
import { Toaster } from './components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanstackProvider>
      <RouterProvider router={router} />
      <Toaster richColors toastOptions={{}} />
    </TanstackProvider>
  </StrictMode>
)
