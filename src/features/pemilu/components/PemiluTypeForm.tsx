import LoadingOverlay from '@/components/LoadingOverlay'
import { Card, CardContent } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useFetchCities from '@/queries/useFetchCities'
import useFetchProvinces from '@/queries/useFetchProvinces'
import { Select } from '@radix-ui/react-select'
import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { PemiluFormType } from '../pages/PemiluFormPage'
import useFetchPemiluType from '../queries/useFetchPemiluType'

type Props = {
  form: UseFormReturn<PemiluFormType>
}

const PemiluTypeForm = ({ form }: Props) => {
  const { data: pemiluTypes, isLoading: isLoadingType } = useFetchPemiluType()
  const { data: provinces, isLoading: isLoadingProvinces } = useFetchProvinces()
  const { mutate: fetchCities, data: cities, isPending: isLoadingCities } = useFetchCities()

  const isLoading = isLoadingType || isLoadingProvinces || isLoadingCities

  const [showCity, setShowCity] = useState(false)

  const typeValue = form.watch('type')
  useEffect(() => {
    if (!typeValue) return

    const selectedType = pemiluTypes?.find((item) => item.id === typeValue)
    if (selectedType?.tipe === 1) {
      fetchCities(form.getValues('province') || '')
      setShowCity(true)
    } else {
      form.setValue('city', '')
      setShowCity(false)
    }
  }, [typeValue, pemiluTypes, form, fetchCities])

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name !== 'province') return
      if (type !== 'change') return

      fetchCities(value.province || '')
    })
    return () => subscription.unsubscribe()
  }, [fetchCities, form])

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <Card className='p-6 rounded-xl'>
        <CardContent className='p-0 space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Pemilu</FormLabel>
                <FormControl>
                  <Input placeholder='Ketikkan nama pemilu...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis Pemilu</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    if (pemiluTypes?.find((item) => item.id === value)?.tipe === 1) {
                      setShowCity(true)
                    } else {
                      form.setValue('city', '')
                      setShowCity(false)
                    }
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger data-selected={Boolean(field.value)} className='data-[selected=true]:bg-grey-50'>
                      <SelectValue placeholder='Pilih Tipe Pemilu' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {pemiluTypes?.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='province'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provinsi</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger data-selected={Boolean(field.value)} className='data-[selected=true]:bg-grey-50'>
                      <SelectValue placeholder='Pilih Provinsi' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {provinces?.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {showCity && (
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kabupaten/Kota</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-selected={Boolean(field.value)} className='data-[selected=true]:bg-grey-50'>
                        <SelectValue placeholder='Pilih Kabupaten/Kota' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities?.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default PemiluTypeForm
