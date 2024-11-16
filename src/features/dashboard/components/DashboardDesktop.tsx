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

const calcPercentage = (total: number, count: number) => {
  return (count * 100) / total
}

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
            {isLoading ? <CandidateCardSkeleton /> : quickCount && <CandidateCard quickCount={quickCount} />}

            {quickCount && (
              <div className='flex items-center w-full h-[50px] [&>div:first-child]:rounded-l-xl [&>div:last-child]:rounded-r-xl rounded-xl border-grey-500 border'>
                {quickCount.calon_hasil.map((item) => (
                  <div
                    key={item.id_paslon}
                    style={{
                      backgroundColor: item.warna,
                      width:
                        calcPercentage(quickCount.total_dpt - quickCount.total_suara_tidak_sah, item.jumlah_suara) +
                        '%',
                      height: '100%'
                    }}
                  ></div>
                ))}

                <div
                  className='bg-grey-500 h-full'
                  style={{
                    width:
                      calcPercentage(
                        quickCount.total_dpt - quickCount.total_suara_tidak_sah,
                        quickCount.total_dpt - quickCount.total_suara_tidak_sah - quickCount.total_suara_masuk
                      ) + '%'
                  }}
                ></div>
              </div>
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
