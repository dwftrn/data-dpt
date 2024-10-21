import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { MapPin } from 'lucide-react'
import CandidateAvatar from './CandidateAvatar'

const PemiluListCard = () => {
  return (
    <Card className='rounded-xl py-8 px-12'>
      <CardContent className='flex gap-16 p-0 items-center justify-between'>
        <div className='space-y-4 w-[40%]'>
          <CardTitle className='text-base lg:text-2xl leading-8 font-black'>
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
    </Card>
  )
}

export default PemiluListCard
