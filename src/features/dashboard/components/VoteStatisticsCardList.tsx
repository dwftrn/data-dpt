import useSearchParams from '@/hooks/useSearchParams'
import useFetchQuickCountCards from '../queries/useFetchQuickCountCards'
import { REGION_CODE } from '../services/dashboard.service'
import VoteStatisticsCard from './VoteStatisticsCard'
import VoteStatisticsSkeleton from './VoteStatisticsSkeleton'

const VoteStatisticsCardList = () => {
  const [searchParams] = useSearchParams()
  const idPemilu = searchParams.get('pemilu') || ''

  const province = searchParams.get('province') || '0'
  const city = searchParams.get('city') || '0'
  const district = searchParams.get('district') || '0'
  const subdistrict = searchParams.get('subdistrict') || '0'

  const region =
    subdistrict !== '0'
      ? REGION_CODE.SUBDISTRICT
      : district !== '0'
      ? REGION_CODE.DISTRICT
      : city !== '0'
      ? REGION_CODE.CITY
      : province !== '0'
      ? REGION_CODE.PROVINCE
      : REGION_CODE.ALL

  const { data, isLoading } = useFetchQuickCountCards({
    id_pemilu: idPemilu,
    id_wilayah:
      region === REGION_CODE.ALL
        ? ''
        : region === REGION_CODE.PROVINCE
        ? province
        : region === REGION_CODE.CITY
        ? city
        : region === REGION_CODE.DISTRICT
        ? district
        : subdistrict,
    kode_wilayah: region
  })

  const cards = data?.data

  return isLoading ? (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {Array.from({ length: 3 }).map((_, index) => (
        <VoteStatisticsSkeleton key={index} />
      ))}
    </div>
  ) : (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {cards?.map((item) => (
        <VoteStatisticsCard key={item.id_region} data={item} region={region} />
      ))}
    </div>
  )
}

export default VoteStatisticsCardList
