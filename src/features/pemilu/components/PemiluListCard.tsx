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
import { Link } from 'react-router-dom'
import CandidateAvatar from './CandidateAvatar'
import { PemiluWithCandidate } from '../service/pemilu.service'
import useDeletePemilu from '../queries/useDeletePemilu'
import LoadingOverlay from '@/components/LoadingOverlay'

const PemiluListCard = ({ pemilu }: { pemilu: PemiluWithCandidate }) => {
  const { mutate, isPending: isLoading } = useDeletePemilu()

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
              <Link to={`/pemilu/form/${pemilu._id}`}>
                <DropdownMenuItem className='cursor-pointer'>
                  <SquarePen />
                  <span>Sunting</span>
                </DropdownMenuItem>
              </Link>
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
