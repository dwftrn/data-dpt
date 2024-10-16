import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import CandidateCard from '../components/CandidateCard'
import VoteStatisticsCard from '../components/VoteStatisticsCard'

const DashboardPage = () => {
  return (
    <section className='flex flex-col gap-6 py-4'>
      <div className='flex items-center justify-between'>
        <h1 className='font-semibold text-lg'>Quick Count Pemilihan Walikota Cimahi</h1>
        <Select>
          <SelectTrigger className='capitalize w-1/4'>
            <SelectValue placeholder='Pilih Pemilu' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='0'>Semua</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CandidateCard />

      <div className='flex items-center gap-4'>
        <Label>Filter</Label>
        {Array.from({ length: 4 }).map((_, index) => (
          <Select key={index}>
            <SelectTrigger className='capitalize w-1/4'>
              <SelectValue placeholder='Pilih Pemilu' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='0'>Semua</SelectItem>
            </SelectContent>
          </Select>
        ))}
      </div>
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
