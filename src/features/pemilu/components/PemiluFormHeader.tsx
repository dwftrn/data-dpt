import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PemiluFormHeader = () => {
  const [leftOffset, setLeftOffset] = useState(0)

  useEffect(() => {
    const updateOffset = () => {
      // Find the sidebar element - adjust the selector based on your sidebar's structure
      const sidebar = document.querySelector('[data-panel="sidebar"]') || document.querySelector('.sidebar')

      if (sidebar) {
        const sidebarWidth = sidebar.getBoundingClientRect().width
        setLeftOffset(sidebarWidth)
      }
    }

    // Initial calculation
    updateOffset()

    // Create a ResizeObserver to watch the sidebar
    const resizeObserver = new ResizeObserver(() => {
      updateOffset()
    })

    // Find and observe the sidebar
    const sidebar = document.querySelector('[data-panel="sidebar"]') || document.querySelector('.sidebar')
    if (sidebar) {
      resizeObserver.observe(sidebar)
    }

    // Cleanup
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      className='h-14 lg:h-[60px] flex items-center justify-between bg-white fixed top-0 inset-x-0 px-4 md:px-6 2xl:px-8 shadow z-50'
      style={{
        left: `${leftOffset}px`,
        right: 0
      }}
    >
      <h1 className='font-semibold'>Tambah Pemilu</h1>
      <div className='flex items-center gap-4'>
        <Link to='/pemilu'>
          <Button type='button' variant='outline' className='gap-2'>
            Batal
          </Button>
        </Link>
        <Button form='pemilu-form' className='gap-2'>
          <Save className='size-4' />
          Simpan
        </Button>
      </div>
    </div>
  )
}

export default PemiluFormHeader
