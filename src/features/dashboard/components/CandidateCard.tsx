import { Card, CardContent } from '@/components/ui/card'
import CandidateCardItem from './CandidateCardItem'

const CandidateCard = () => {
  return (
    <div>
      <Card className='rounded-t-xl rounded-b-none p-6 border-b-0'>
        <CardContent className='p-0 flex justify-evenly gap-4'>
          {Array.from({ length: 3 }).map((_, i) => (
            <CandidateCardItem key={i} totalData={3} />
          ))}
        </CardContent>
      </Card>
      <div className='rounded-b-xl grid grid-cols-2 border border-t-0 font-bold text-xs'>
        <div className='bg-light-green rounded-bl-xl flex items-center justify-between px-8 py-4'>
          <span>Suara Sah Masuk</span>
          <span>200.000.000</span>
        </div>
        <div className='bg-error-50 rounded-br-xl flex items-center justify-between px-8 py-4'>
          <span>Suara Tidak Masuk</span>
          <span>200.000.000</span>
        </div>
      </div>
    </div>
  )
}

export default CandidateCard
