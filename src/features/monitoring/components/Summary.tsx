import BoxIcon from '@/assets/3d-box-icon.svg'
import CheckIcon from '@/assets/check-icon.svg'
import CloseIcon from '@/assets/close-icon.svg'
import TimeAttackIcon from '@/assets/time-attack-icon.svg'
import { Card, CardContent } from '@/components/ui/card'
import useSearchParams from '@/hooks/useSearchParams'
import useFetchSummary from '../queries/useFetchSummary'

const Summary = () => {
  const [searchParams] = useSearchParams()
  const pemiluId = searchParams.get('pemilu') || ''

  const { data } = useFetchSummary(pemiluId)

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
      <Card className='p-6 rounded-3xl border-0 border-b-4 border-success-700'>
        <CardContent className='p-0 flex flex-col items-center gap-3'>
          <img alt='icon' src={CheckIcon} />
          <h1 className='font-bold text-2xl'>{data?.count_verif}</h1>
          <p className='text-sm'>Terverifikasi</p>
        </CardContent>
      </Card>
      <Card className='p-6 rounded-3xl border-0 border-b-4 border-special-orange'>
        <CardContent className='p-0 flex flex-col items-center gap-3'>
          <img alt='icon' src={TimeAttackIcon} />
          <h1 className='font-bold text-2xl'>{data?.count_unverif}</h1>
          <p className='text-sm'>Belum Terverifikasi</p>
        </CardContent>
      </Card>
      <Card className='p-6 rounded-3xl border-0 border-b-4 border-primary-red-700'>
        <CardContent className='p-0 flex flex-col items-center gap-3'>
          <img alt='icon' src={CloseIcon} />
          <h1 className='font-bold text-2xl'>{data?.count_reject}</h1>
          <p className='text-sm'>Ditolak</p>
        </CardContent>
      </Card>
      <Card className='p-6 rounded-3xl border-0 border-b-4 border-grey-700'>
        <CardContent className='p-0 flex flex-col items-center gap-3'>
          <img alt='icon' src={BoxIcon} />
          <h1 className='font-bold text-2xl'>{data?.count_unvote_tps}</h1>
          <p className='text-sm'>Belum Input</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Summary
