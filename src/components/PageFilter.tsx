import useFetchDistricts from '@/features/dpt/queries/useFetchDistricts'
import useFetchSubdistricts from '@/features/dpt/queries/useFetchSubdistricts'
import { cn } from '@/lib/utils'
import useFetchCities from '@/queries/useFetchCities'
import useFetchProvinces from '@/queries/useFetchProvinces'
import { FilterX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import LoadingOverlay from './LoadingOverlay'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import useSearchParams from '@/hooks/useSearchParams'

type FilterSelection = {
  province: string
  city: string
  district: string
  subdistrict: string
}

type Props = {
  onChange?(value: FilterSelection, oldValue?: FilterSelection): void
}

const list = ['province', 'city', 'district', 'subdistrict']

const PageFilter = ({ onChange }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const isInitialized = useRef(false)

  const province = searchParams.get('province') || '0'
  const city = searchParams.get('city') || '0'
  const district = searchParams.get('district') || '0'
  const subdistrict = searchParams.get('subdistrict') || '0'

  const { data: provinces, isLoading: isLoadingProvinces } = useFetchProvinces()
  const { mutate: fetchCities, data: cities, isPending: isLoadingCities } = useFetchCities()
  const { mutate: fetchDistricts, data: districts, isPending: isLoadingDistricts } = useFetchDistricts()
  const { mutate: fetchSubdistricts, data: subdistricts, isPending: isLoadingSubdistricts } = useFetchSubdistricts()

  const isLoading = isLoadingProvinces || isLoadingCities || isLoadingDistricts || isLoadingSubdistricts

  const [selections, setSelections] = useState<FilterSelection>({
    province: province,
    city: city,
    district: district,
    subdistrict: subdistrict
  })

  const handleSelectionChange = (field: keyof typeof selections, value: string) => {
    setSelections((prev) => {
      const newVal = { ...prev, [field]: value }
      onChange?.(newVal, prev)
      return newVal
    })

    if (field === 'province' && value !== '0') fetchCities(value)
    if (field === 'city' && value !== '0') fetchDistricts(value)
    if (field === 'district' && value !== '0') fetchSubdistricts(value)
  }

  const getFieldValue = (field: string) => {
    return field === 'province'
      ? provinces
      : field === 'city'
      ? cities
      : field === 'district'
      ? districts
      : subdistricts
  }

  const resetFilter = () => {
    setSelections({
      province: '0',
      city: '0',
      district: '0',
      subdistrict: '0'
    })
  }

  useEffect(() => {
    setSearchParams(selections)
  }, [selections, setSearchParams])

  useEffect(() => {
    if (!isInitialized.current) {
      const fetchData = async () => {
        try {
          if (province !== '0') {
            await fetchCities(province)

            if (city !== '0') {
              await fetchDistricts(city)

              if (district !== '0') {
                await fetchSubdistricts(district)
              }
            }
          }
        } catch (error) {
          console.error('Error fetching nested data:', error)
        }

        isInitialized.current = true
      }

      fetchData()
    }
  }, [province, city, district, fetchCities, fetchDistricts, fetchSubdistricts])

  if (isLoading) return <LoadingOverlay />

  return (
    <div className='grid grid-cols-4 items-center gap-4'>
      {list.map((field, index) => (
        <div key={index} className={cn({ 'flex items-center gap-2': index === list.length - 1 })}>
          <Select
            value={selections[field as keyof typeof selections]}
            onValueChange={(value) => handleSelectionChange(field as keyof typeof selections, value)}
          >
            <SelectTrigger className='capitalize w-full'>
              <SelectValue placeholder='Pilih Pemilu' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='0'>Semua</SelectItem>
              {getFieldValue(field)?.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {index === list.length - 1 && (
            <Button variant='outline' onClick={resetFilter}>
              <span className='hidden lg:block text-blue-500'>Reset Filter</span>
              <FilterX className='size-4 block lg:hidden' />
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}

export default PageFilter
