import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { ReactNode, useState } from 'react'
import SettingDialogContent from './SettingDialogContent'
import SettingsFooter from './SettingFooter'

type Props = {
  trigger: ReactNode
}

const SettingsDialog = ({ trigger }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild role='button'>
        {trigger}
      </DialogTrigger>
      <DialogContent withClose={false} className='rounded-2xl border-none p-8 pb-0 sm:rounded-2xl'>
        <DialogHeader className='-mx-8 flex flex-row items-center justify-between border-b border-border px-8 pb-8'>
          <DialogTitle>Pengaturan</DialogTitle>
          <DialogClose>
            <X size={24} />
          </DialogClose>
        </DialogHeader>

        <SettingDialogContent />

        <SettingsFooter />
      </DialogContent>
    </Dialog>
  )
}

export default SettingsDialog
