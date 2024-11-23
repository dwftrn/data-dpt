import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import useSearchParams from '@/hooks/useSearchParams'
import { cn } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'
import { RefObject, useState } from 'react'
import SaksiForm from './SaksiForm'

const SaksiFormDialog = ({ triggerRef }: { triggerRef?: RefObject<HTMLButtonElement> }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id') || ''
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) setSearchParams({ id: '' })
        setIsOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <Button ref={triggerRef} className='gap-3'>
          <PlusCircle className='size-5 fill-white stroke-primary-blue-700' />
          Tambah Data
        </Button>
      </DialogTrigger>
      <DialogContent className='p-0 gap-0'>
        <DialogHeader className='py-4 px-6 border-b border-grey-500'>
          <DialogTitle>{id ? 'Sunting Data Saksi' : 'Tambah Data Saksi'}</DialogTitle>
          <DialogDescription className='sr-only'>{id ? 'Sunting Data Saksi' : 'Tambah Data Saksi'}</DialogDescription>
        </DialogHeader>

        <div className='py-4 px-6'>
          <SaksiForm onClose={() => setIsOpen(false)} />
        </div>

        <DialogFooter className='py-4 px-6 sm:justify-between'>
          <DialogClose className={cn(buttonVariants({ variant: 'secondary' }), 'bg-grey-500/50')}>Batal</DialogClose>
          <Button form='saksi-form' className='bg-success-700 hover:bg-success-700/90'>
            {id ? 'Sunting' : 'Tambah'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SaksiFormDialog
