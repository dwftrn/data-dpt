import { Card, CardContent } from '@/components/ui/card'
import { QuickCount } from '../services/dashboard.service'
import CandidateCardItem from './CandidateCardItem'

const CandidateCard = ({ quickCount }: { quickCount: QuickCount }) => {
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
        <div className='bg-primary-blue-700 rounded-bl-xl text-white flex items-center justify-between px-8 py-4 gap-8 w-full h-full'>
          <span>Suara Masuk</span>
          <span className='text-xs font-extrabold'>
            {Number(quickCount?.total_suara_masuk).toLocaleString('id')} /{' '}
            {Number(quickCount?.total_dpt).toLocaleString('id')} (
            {Number(quickCount?.persentase_suara_masuk).toLocaleString('id', { maximumFractionDigits: 2 })}%)
          </span>
        </div>
        <div className='bg-light-green flex items-center justify-between px-8 py-4 h-full w-full'>
          <span>Suara Sah</span>
          <span className='text-xs font-extrabold'>
            {Number(quickCount?.total_suara_sah).toLocaleString('id')} /{' '}
            {Number(quickCount?.total_suara_masuk).toLocaleString('id')} (
            {Number(quickCount?.persentase_suara_sah).toLocaleString('id', { maximumFractionDigits: 2 })}%)
          </span>
        </div>
        <div className='bg-error-50 flex items-center justify-between px-8 py-4 h-full rounded-br-xl w-full'>
          <span>Suara Tidak Sah</span>
          <span className='text-xs font-extrabold'>
            {Number(quickCount?.total_suara_tidak_sah).toLocaleString('id')} /{' '}
            {Number(quickCount?.total_suara_masuk).toLocaleString('id')} (
            {Number(quickCount?.persentase_suara_tidak_sah).toLocaleString('id', { maximumFractionDigits: 2 })}%)
          </span>
        </div>
      </div>
    </div>
  )
}

export default CandidateCard
