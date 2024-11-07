import useFetchDistricts from '@/features/dpt/queries/useFetchDistricts'
import useFetchSubdistricts from '@/features/dpt/queries/useFetchSubdistricts'
import useSearchParams from '@/hooks/useSearchParams'
import { cn } from '@/lib/utils'
import useFetchCities from '@/queries/useFetchCities'
import useFetchProvinces from '@/queries/useFetchProvinces'
import { FilterX } from 'lucide-react'
import { useEffect, useState } from 'react'
import LoadingOverlay from './LoadingOverlay'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'

type FilterSelection = {
  province: string
  city: string
  district: string
  subdistrict: string
}

type Props = {
  onChange?(value: FilterSelection, oldValue?: FilterSelection): void
}

const labels = ['Provinsi', 'Kabupaten/Kota', 'Kecamatan', 'Kelurahan']
const list = ['province', 'city', 'district', 'subdistrict']

const PageFilter = ({ onChange }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()

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
    // Calculate new selections
    const newSelections = { ...selections, [field]: value }

    // Clear dependent fields when parent field changes
    if (field === 'province') {
      newSelections.city = '0'
      newSelections.district = '0'
      newSelections.subdistrict = '0'
    } else if (field === 'city') {
      newSelections.district = '0'
      newSelections.subdistrict = '0'
    } else if (field === 'district') {
      newSelections.subdistrict = '0'
    }

    // Update selections state
    setSelections(newSelections)

    // Update search params
    setSearchParams(newSelections)

    // Trigger onChange callback
    onChange?.(newSelections, selections)

    // Fetch dependent data
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
    const newSelections = {
      province: '0',
      city: '0',
      district: '0',
      subdistrict: '0'
    }
    setSelections(newSelections)
    setSearchParams(newSelections)
  }

  useEffect(() => {
    setSelections({
      province,
      city,
      district,
      subdistrict
    })
  }, [province, city, district, subdistrict])

  useEffect(() => {
    if (province !== '0') {
      fetchCities(province)
      if (city !== '0') {
        fetchDistricts(city)
        if (district !== '0') {
          fetchSubdistricts(district)
        }
      }
    }
  }, [province, city, district, fetchCities, fetchDistricts, fetchSubdistricts])

  if (isLoading) return <LoadingOverlay />

  return (
    <div className='grid grid-cols-4 items-center gap-4'>
      {list.map((field, index) => (
        <div key={index}>
          <Label className='text-xs capitalize'>{labels[index]}</Label>
          <div className={cn({ 'flex items-center gap-2': index === list.length - 1 })}>
            <Select
              value={selections[field as keyof typeof selections]}
              onValueChange={(value) => handleSelectionChange(field as keyof typeof selections, value)}
            >
              <SelectTrigger className='capitalize w-full'>
                <SelectValue placeholder={`Pilih ${list[index]}`} />
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
        </div>
      ))}
    </div>
  )
}

export default PageFilter
