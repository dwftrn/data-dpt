import { Card, CardContent } from '@/components/ui/card'
import useSearchParams from '@/hooks/useSearchParams'
import useFetchQuickCount from '../queries/useFetchQuickCount'
import CandidateCardItem from './CandidateCardItem'

const CandidateCard = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('pemilu') || ''

  const { data } = useFetchQuickCount({ id_pemilu: id })

  const quickCount = data?.data

  return (
    <div>
      <Card className='rounded-t-xl rounded-b-none p-6 border-b-0'>
        <CardContent className='p-0 flex justify-evenly gap-4'>
          {quickCount?.calon_hasil
            .sort((a, b) => Number(a.no_urut) - Number(b.no_urut))
            .map((item) => (
              <CandidateCardItem key={item.id_paslon} totalData={quickCount.calon_hasil.length} candidate={item} />
            ))}
        </CardContent>
      </Card>
      <div className='flex items-center rounded-b-xl border border-t-0 font-semibold h-14 text-xs'>
        <div className='bg-light-green rounded-bl-xl flex items-center justify-between px-8 py-4 h-full flex-1'>
          <span>Suara Sah</span>
          <span className='text-base font-extrabold'>{Number(quickCount?.total_suara_sah).toLocaleString('id')}</span>
        </div>
        <div className='bg-error-50 flex items-center justify-between px-8 py-4 h-full flex-1'>
          <span>Suara Tidak Sah</span>
          <span className='text-base font-extrabold'>
            {Number(quickCount?.total_suara_tidak_sah).toLocaleString('id')}
          </span>
        </div>
        <div className='bg-white rounded-br-xl flex items-center justify-between px-8 py-4 gap-8'>
          <span>Suara Masuk</span>
          <span className='text-base font-extrabold'>
            {Number(quickCount?.persentase_suara_masuk).toLocaleString('id', { maximumFractionDigits: 2 })}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default CandidateCard
