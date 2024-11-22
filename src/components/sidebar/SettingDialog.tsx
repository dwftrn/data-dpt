import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useDebounce } from '@/hooks/useDebounce'
import useCheckAbsen from '@/queries/useCheckAbsen'
import useCheckInput from '@/queries/useCheckInput'
import useSetAbsen from '@/queries/useSetAbsen'
import useSetInput from '@/queries/useSetInput'
import { DialogDescription } from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'
import SettingsFooter from './SettingFooter'

type Props = {
  trigger: ReactNode
}

const SettingsDialog = ({ trigger }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const { data: isCanAbsen, isLoading: isLoadingAbsen } = useCheckAbsen()
  const { data: isCanInput, isLoading: isLoadingInput } = useCheckInput()
  const { mutateAsync: setIsCanAbsen } = useSetAbsen()
  const { mutateAsync: setIsCanInput } = useSetInput()

  const [canAbsen, setCanAbsen] = useState<boolean | undefined>(undefined)
  const [canInput, setCanInput] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (!isLoadingAbsen && isCanAbsen !== undefined && canAbsen === undefined) {
      setCanAbsen(!!isCanAbsen)
    }
  }, [isLoadingAbsen, isCanAbsen, canAbsen])

  useEffect(() => {
    if (!isLoadingInput && isCanInput !== undefined && canInput === undefined) {
      setCanInput(!!isCanInput)
    }
  }, [isLoadingInput, isCanInput, canInput])

  const debounceAbsen = useDebounce(canAbsen, 1000)
  const debounceInput = useDebounce(canInput, 1000)

  useEffect(() => {
    if (debounceAbsen === undefined || isLoadingAbsen) return
    if (debounceAbsen === !!isCanAbsen) return

    setIsCanAbsen(Number(debounceAbsen) as 0 | 1)
  }, [debounceAbsen, isCanAbsen, setIsCanAbsen, isLoadingAbsen])

  useEffect(() => {
    if (debounceInput === undefined || isLoadingInput) return
    if (debounceInput === !!isCanInput) return

    setIsCanInput(Number(debounceInput) as 0 | 1)
  }, [debounceInput, isCanInput, setIsCanInput, isLoadingInput])

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

        <div className='space-y-3'>
          <DialogDescription className='font-bold text-xs'>Pengaturan Input Pemilu</DialogDescription>
          <div className='flex items-center justify-between text-sm font-normal'>
            <Label>Izinkan saksi absen kehadiran</Label>
            <Switch checked={canAbsen} onCheckedChange={setCanAbsen} />
          </div>
          <div className='flex items-center justify-between text-sm font-normal'>
            <Label>Izinkan saksi input perolehan suara</Label>
            <Switch checked={canInput} onCheckedChange={setCanInput} />
          </div>
        </div>
        <SettingsFooter />
      </DialogContent>
    </Dialog>
  )
}

export default SettingsDialog
