import SelectPemilu from '@/components/SelectPemilu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import MonitoringTable from '../components/MonitoringTable'
import Summary from '../components/Summary'

const MonitoringPage = () => {
  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center justify-between h-14 lg:h-[60px] -mt-4 md:-mt-6 2xl:-mt-8'>
        <h1 className='font-semibold text-lg'>Monitoring</h1>
        <div className='relative w-[375px]'>
          <Search className='absolute top-2.5 left-3 size-5' />
          <Input placeholder='Cari TPS...' className='bg-white border-grey-500 pl-10' />
          <Button variant='secondary' size='sm' className='absolute top-1.5 right-1 h-[30px] text-xs font-normal'>
            Cari
          </Button>
        </div>
        <SelectPemilu />
      </div>

      <Summary />

      <MonitoringTable />
    </section>
  )
}

export default MonitoringPage
