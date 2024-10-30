import PageFilter from '@/components/PageFilter'
import PageHeader from '@/components/PageHeader'
import CandidateCard from '../components/CandidateCard'
import VoteStatisticsCardList from '../components/VoteStatisticsCardList'

const DashboardPage = () => {
  return (
    <section className='flex flex-col gap-6'>
      <PageHeader title='Quick Count Pemilihan Walikota Cimahi' />

      <CandidateCard />

      <PageFilter />

      <VoteStatisticsCardList />
    </section>
  )
}

export default DashboardPage
