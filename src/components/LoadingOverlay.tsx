import { Loader2 } from 'lucide-react'

const LoadingOverlay = () => {
  return (
    <div className='fixed inset-0 flex h-dvh w-dvw items-center justify-center bg-black/80' style={{ zIndex: 9999 }}>
      <Loader2 size={100} className='animate-spin text-gray-400' />
    </div>
  )
}

export default LoadingOverlay
