import LoadingOverlay from '@/components/LoadingOverlay'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { showConfirm } from '@/lib/alert'
import { Ellipsis, MapPin, SquarePen, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import useCheckPemilu from '../queries/useCheckPemilu'
import useDeletePemilu from '../queries/useDeletePemilu'
import { PemiluWithCandidate } from '../service/pemilu.service'
import CandidateAvatar from './CandidateAvatar'

const PemiluListCard = ({ pemilu }: { pemilu: PemiluWithCandidate }) => {
  const navigate = useNavigate()
  const { mutate, isPending: isLoadingDelete } = useDeletePemilu()
  const { mutateAsync: check, isPending: isLoadingCheck } = useCheckPemilu()

  const isLoading = isLoadingDelete || isLoadingCheck

  const handleDelete = async () => {
    const result = await showConfirm({
      title: 'Hapus Pemilu',
      text: 'Anda yakin ingin menghapus data pemilu ini?',
      confirmButtonText: 'Hapus',
      confirmButtonColor: 'hsl(0 84.2% 60.2%)',
      cancelButtonText: 'Batal'
    })

    if (result.isConfirmed) {
      mutate(pemilu._id)
    }
  }

  const handleCheck = async () => {
    try {
      const res = await check(pemilu._id)
      if (res)
        return toast.warning('Tidak Dapat Menyunting', {
          description: 'Pemilu yang memiliki data suara tidak dapat disunting'
        })

      navigate(`/pemilu/form/${pemilu._id}`)
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <Card className='rounded-xl py-8 px-12 shadow-lg bg-gradient-to-b from-white to-gray-100 relative'>
        <CardContent className='flex gap-16 p-0 items-center justify-between'>
          <div className='space-y-4 w-[40%]'>
            <CardTitle className='text-base lg:text-2xl leading-8 font-bold'>{pemilu.name}</CardTitle>
            <div className='flex items-center gap-2'>
              <MapPin />
              {'kab_kota_name' in pemilu && `${pemilu.kab_kota_name}, `}
              {pemilu.provinsi_name}
            </div>
          </div>
          <div className='flex items-center gap-4'>
            {pemilu.paslon
              .sort((a, b) => Number(a.no_urut) - Number(b.no_urut))
              .map((item) => (
                <CandidateAvatar key={item.no_urut} candidate={item} />
              ))}
          </div>
        </CardContent>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='icon' className='absolute right-3 top-3 rounded-full'>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem className='cursor-pointer' onClick={handleCheck}>
                <SquarePen />
                <span>Sunting</span>
              </DropdownMenuItem>

              <DropdownMenuItem className='cursor-pointer text-destructive' onClick={handleDelete}>
                <Trash2 />
                <span>Hapus</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Card>
    </>
  )
}

export default PemiluListCard
