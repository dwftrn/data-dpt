import Logo from '@/assets/logo-horizontal-white.svg'
import EmptyPemilu from '@/components/EmptyPemilu'
import PageFilter from '@/components/PageFilter'
import PageHeader from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import useSearchParams from '@/hooks/useSearchParams'
import { Link, useLocation } from 'react-router-dom'
import CandidateCard from '../components/CandidateCard'
import VoteStatisticsCardList from '../components/VoteStatisticsCardList'
import useFetchQuickCount from '../queries/useFetchQuickCount'
import CandidateCardSkeleton from './CandidateCardSkeleton'
import MapContainer from './MapContainer'
import ProgressStats from './ProgressStats'

const DashboardDesktop = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('pemilu') || ''

  const { data, isLoading } = useFetchQuickCount({ id_pemilu: id })

  const { pathname } = useLocation()
  const isPublic = pathname === '/quick-count'

  const quickCount = data?.data

  return (
    <>
      {isPublic && (
        <div className='items-center bg-primary-blue-700 w-full h-14 lg:h-[60px] p-8 justify-between hidden md:flex'>
          <img alt='logo' src={Logo} className='' />
          <Link to='/sign-in'>
            <Button className='border'>Login</Button>
          </Link>
        </div>
      )}
      <section data-public={isPublic} className='flex-col gap-6 data-[public=true]:p-8 hidden md:flex'>
        <PageHeader title='Dashboard Perolehan Suara' />

        {!quickCount && !isLoading ? (
          <EmptyPemilu />
        ) : (
          <>
            {isLoading ? (
              <CandidateCardSkeleton />
            ) : (
              quickCount && (
                <>
                  <CandidateCard quickCount={quickCount} />
                  <ProgressStats quickCount={quickCount} />
                </>
              )
            )}

            <MapContainer />

            <PageFilter />

            <VoteStatisticsCardList />
          </>
        )}
      </section>
    </>
  )
}

export default DashboardDesktop
