import PageFilter from '@/components/PageFilter'
import PageHeader from '@/components/PageHeader'
import CandidateCard from '../components/CandidateCard'
import VoteStatisticsCard from '../components/VoteStatisticsCard'

const DashboardPage = () => {
  return (
    <section className='flex flex-col gap-6 py-4'>
      <PageHeader title='Quick Count Pemilihan Walikota Cimahi' />

      <CandidateCard />

      <PageFilter />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        <VoteStatisticsCard />
        <VoteStatisticsCard />
        <VoteStatisticsCard />
        <VoteStatisticsCard />
        <VoteStatisticsCard />
        <VoteStatisticsCard />
        <VoteStatisticsCard />
        <VoteStatisticsCard />
        <VoteStatisticsCard />
        <VoteStatisticsCard />
        <VoteStatisticsCard />
        <VoteStatisticsCard />
      </div>
    </section>
  )
}

export default DashboardPage
