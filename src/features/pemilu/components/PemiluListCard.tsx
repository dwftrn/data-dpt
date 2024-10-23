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

const PemiluListCard = () => {
  const id = '123'
  return (
    <Card className='rounded-xl py-8 px-12 shadow-lg bg-gradient-to-b from-white to-gray-100 relative'>
      <CardContent className='flex gap-16 p-0 items-center justify-between'>
        <div className='space-y-4 w-[40%]'>
          <CardTitle className='text-base lg:text-2xl leading-8 font-bold'>
            Pemilihan Walikota dan Wakil Walikota Kota Cimahi Provinsi Jawa Barat Tahun 2024
          </CardTitle>
          <div className='flex items-center gap-2'>
            <MapPin />
            Kota Cimahi, Jawa Barat
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <CandidateAvatar />
          <CandidateAvatar />
          <CandidateAvatar />
          <CandidateAvatar />
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
            <Link to={`/pemilu/form/${id}`}>
              <DropdownMenuItem className='cursor-pointer'>
                <SquarePen />
                <span>Sunting</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className='cursor-pointer'
              onClick={() => {
                showConfirm({
                  title: 'Hapus Pemilu',
                  text: 'Anda yakin ingin menghapus data pemilu ini?',
                  confirmButtonText: 'Hapus',
                  confirmButtonColor: 'hsl(0 84.2% 60.2%)'
                })
              }}
            >
              <Trash2 />
              <span>Hapus</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  )
}

export default PemiluListCard
