import BoxIcon from '@/assets/3d-box-icon.svg'
import CheckIcon from '@/assets/check-icon.svg'
import CloseIcon from '@/assets/close-icon.svg'
import TimeAttackIcon from '@/assets/time-attack-icon.svg'
import useSearchParams from '@/hooks/useSearchParams'
import useFetchSummary from '../queries/useFetchSummary'
import SummaryCard from './SummaryCard'

const Summary = () => {
  const [searchParams] = useSearchParams()
  const pemiluId = searchParams.get('pemilu') || ''

  const { data } = useFetchSummary(pemiluId)

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
      <SummaryCard
        icon={CheckIcon}
        count={data?.count_verif || 0}
        label='Terverifikasi'
        className='border-success-700'
        status={1}
      />
      <SummaryCard
        icon={TimeAttackIcon}
        count={data?.count_unverif || 0}
        label='Belum Terverifikasi'
        className='border-special-orange'
        status={0}
      />
      <SummaryCard
        icon={CloseIcon}
        count={data?.count_reject || 0}
        label='Ditolak'
        className='border-primary-red-700'
        status={2}
      />
      <SummaryCard
        icon={BoxIcon}
        count={data?.count_unvote_tps || 0}
        label='Belum Masuk'
        className='border-grey-700'
        status={null}
      />
    </div>
  )
}

export default Summary
