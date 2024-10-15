import { Loader2 } from 'lucide-react'

const LoadingOverlay = () => {
  return (
    <div className='absolute inset-0 z-50 flex h-dvh w-dvw items-center justify-center bg-black/80'>
      <Loader2 size={100} className='animate-spin text-gray-400' />
    </div>
  )
}

export default LoadingOverlay
