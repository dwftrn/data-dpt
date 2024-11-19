import useFetchDistricts from '@/features/dpt/queries/useFetchDistricts'
import useFetchSubdistricts from '@/features/dpt/queries/useFetchSubdistricts'
import useSearchParams from '@/hooks/useSearchParams'
import { cn } from '@/lib/utils'
import useFetchCities from '@/queries/useFetchCities'
import useFetchProvinces from '@/queries/useFetchProvinces'
import { FilterX } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import MultiSelect from './ui/multi-select'

type FilterSelection = {
  province: string
  city: string
  district: string
  subdistricts: string[]
}

const labels = ['Provinsi', 'Kabupaten/Kota', 'Kecamatan', 'Kelurahan']
const list = ['province', 'city', 'district']

const PageFilterMulti = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { pathname } = useLocation()
  const initialized = useRef(false)

  const province = searchParams.get('province') || '0'
  const city = searchParams.get('city') || '0'
  const district = searchParams.get('district') || '0'
  const subdistrictParams = searchParams.get('subdistricts') || ''
  const subdistrictArray = useMemo(() => (subdistrictParams ? subdistrictParams.split(',') : []), [subdistrictParams])

  const { data: provinces, isLoading: isLoadingProvinces } = useFetchProvinces()
  const { mutate: fetchCities, data: cities, isPending: isLoadingCities } = useFetchCities()
  const { mutate: fetchDistricts, data: districts, isPending: isLoadingDistricts } = useFetchDistricts()
  const { mutate: fetchSubdistricts, data: subdistricts, isPending: isLoadingSubdistricts } = useFetchSubdistricts()

  const isLoading = isLoadingProvinces || isLoadingCities || isLoadingDistricts || isLoadingSubdistricts

  const [selections, setSelections] = useState<FilterSelection>({
    province: province,
    city: city,
    district: district,
    subdistricts: subdistrictArray
  })

  const handleSelectionChange = (field: keyof typeof selections, value: string) => {
    // Calculate new selections
    const newSelections = { ...selections, [field]: value }

    // Clear dependent fields when parent field changes
    if (field === 'province') {
      newSelections.city = '0'
      newSelections.district = '0'
      newSelections.subdistricts = ['0']
    } else if (field === 'city') {
      newSelections.district = '0'
      newSelections.subdistricts = ['0']
    } else if (field === 'district') {
      newSelections.subdistricts = ['0']
    }

    console.log({ value, newSelections })

    // Update selections state
    setSelections(newSelections)

    // Update search params
    setSearchParams({
      ...newSelections,
      subdistricts: newSelections.subdistricts.join(',')
    })

    // Fetch dependent data
    if (field === 'province' && value !== '0') fetchCities(value)
    if (field === 'city' && value !== '0') fetchDistricts(value)
    if (field === 'district' && value !== '0') fetchSubdistricts(value)
  }

  const handleSubdistrictsChange = (values: string[]) => {
    const newSelections = { ...selections, subdistricts: values }
    setSelections(newSelections)
    setSearchParams({
      ...newSelections,
      subdistricts: values.join(',')
    })
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
      subdistricts: ['0']
    }
    setSelections(newSelections)
    setSearchParams({
      ...newSelections,
      subdistricts: newSelections.subdistricts.join(',')
    })
  }

  useEffect(() => {
    setSelections({
      province,
      city,
      district,
      subdistricts: subdistrictArray
    })
  }, [province, city, district, subdistrictArray])

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

  useEffect(() => {
    if (initialized.current) return

    if (!provinces || provinces?.length === 0) return
    setSearchParams({ province: provinces.at(0)?.id || '0' })

    if (!cities || cities?.length === 0) return
    setSearchParams({ city: cities.at(0)?.id || '0' })

    initialized.current = true
  }, [cities, pathname, provinces, setSearchParams])

  return (
    <div className='grid grid-cols-4 items-center gap-4'>
      {list.map((field, index) => (
        <div key={index}>
          <Label className='text-xs capitalize'>{labels[index]}</Label>

          <Select
            // @ts-expect-error fuck
            value={selections[field as keyof typeof selections]}
            onValueChange={(value) => handleSelectionChange(field as keyof typeof selections, value)}
          >
            <SelectTrigger
              data-selected={
                selections[field as keyof typeof selections] !== '0' &&
                Boolean(selections[field as keyof typeof selections])
              }
              disabled={getFieldValue(field)?.length === 0 || isLoading}
              className={cn('data-[selected=true]:ring-2 capitalize w-full bg-white', {
                'animate-pulse': isLoading
              })}
            >
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
        </div>
      ))}
      <div>
        <Label className='text-xs capitalize'>{labels[3]}</Label>
        <div className='flex items-center gap-2'>
          <MultiSelect
            options={
              selections.district !== '0'
                ? subdistricts?.map((item) => ({ label: item.name, value: item.id })) || []
                : []
            }
            selected={selections.subdistricts.length > 0 ? selections.subdistricts : ['0']}
            onChange={handleSubdistrictsChange}
            placeholder='Pilih Kelurahan'
          />
          <Button
            variant='outline'
            onClick={resetFilter}
            disabled={isLoading}
            className={cn('bg-white', { 'animate-pulse': isLoading })}
          >
            <span className='hidden lg:block text-blue-500'>Reset Filter</span>
            <FilterX className='size-4 block lg:hidden' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PageFilterMulti
