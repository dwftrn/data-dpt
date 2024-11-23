import { useDebounce } from '@/hooks/useDebounce'
import useCheckAbsen from '@/queries/useCheckAbsen'
import useCheckInput from '@/queries/useCheckInput'
import useSetAbsen from '@/queries/useSetAbsen'
import useSetInput from '@/queries/useSetInput'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'

const SettingDialogContent = () => {
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
  )
}

export default SettingDialogContent
