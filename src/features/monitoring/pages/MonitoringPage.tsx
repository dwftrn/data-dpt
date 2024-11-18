import PageFilterMulti from '@/components/PageFilterMulti'
import PageHeader from '@/components/PageHeader'
import MonitoringTable from '../components/MonitoringTable'
import Summary from '../components/Summary'

const MonitoringPage = () => {
  return (
    <section className='flex flex-col gap-4'>
      <PageHeader title='Monitoring' />

      <Summary />

      <PageFilterMulti />

      <MonitoringTable />
    </section>
  )
}

export default MonitoringPage
