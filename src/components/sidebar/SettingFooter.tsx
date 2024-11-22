import { DoorOpen, Info } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '../ui/button'

const SettingsFooter = () => {
  return (
    <div className='-mx-8 mt-8 flex items-center justify-between rounded-b-2xl bg-primary p-8 text-white sm:rounded-b-2xl'>
      <div className='flex items-center gap-2'>
        <Info size={20} />
        <p className='body3 font-medium'>Qitara v.1.0.1</p>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className='gap-2'>
            <DoorOpen />
            <span>Keluar</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Keluar Aplikasi</AlertDialogTitle>
            <AlertDialogDescription>Anda yakin ingin keluar?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              className={buttonVariants({ variant: 'destructive' })}
              onClick={() => {
                localStorage.clear()
                location.reload()
              }}
            >
              Keluar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default SettingsFooter
