import PageFilter from '@/components/PageFilter'
import PageHeader from '@/components/PageHeader'
import CandidateCard from '../components/CandidateCard'
import VoteStatisticsCardList from '../components/VoteStatisticsCardList'
import useSearchParams from '@/hooks/useSearchParams'
import useFetchQuickCount from '../queries/useFetchQuickCount'
import EmptyPemilu from '@/components/EmptyPemilu'

const DashboardPage = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('pemilu') || ''

  const { data } = useFetchQuickCount({ id_pemilu: id })

  return (
    <section className='flex flex-col gap-6'>
      <PageHeader title='Dashboard Perolehan Suara' />

      {!data ? (
        <EmptyPemilu />
      ) : (
        <>
          <CandidateCard quickCount={data.data} />

          <PageFilter />

          <VoteStatisticsCardList />
        </>
      )}
    </section>
  )
}

export default DashboardPage
