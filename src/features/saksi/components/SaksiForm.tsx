import { PaginatedData } from '@/api/services'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useFetchAllDistricts from '@/features/dpt/queries/useFetchAllDistricts'
import useFetchSubdistricts from '@/features/dpt/queries/useFetchSubdistricts'
import useFetchTps from '@/features/dpt/queries/useFetchTps'
import useSearchParams from '@/hooks/useSearchParams'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import useInsertSaksi from '../queries/useInsertSaksi'
import useUpdateSaksi from '../queries/useUpdateSaksi'
import { Saksi } from '../services/saksi.service'

type NoUndefined<T> = {
  [P in keyof T]: Exclude<T[P], undefined>
}

const formSchema = z.object({
  name: z.string().min(1, 'Tidak boleh kosong!'),
  nik: z.string().min(1, 'Tidak boleh kosong!'),
  phone: z.string().min(1, 'Tidak boleh kosong!'),
  bankAccount: z.string().min(1, 'Tidak boleh kosong!'),
  bankName: z.string().min(1, 'Tidak boleh kosong!'),
  district: z.string().min(1, 'Tidak boleh kosong!'),
  subdistrict: z.string().min(1, 'Tidak boleh kosong!'),
  tps: z.string().min(1, 'Tidak boleh kosong!'),
  address: z.string().min(1, 'Tidak boleh kosong!'),
  rw: z.string().min(1, 'Tidak boleh kosong!'),
  recommendation: z.string().min(1, 'Tidak boleh kosong!')
})

type FormType = z.infer<typeof formSchema>

const getChangedFields = (current: FormType, original: Saksi | null) => {
  if (!original) return null

  const changes: Record<string, string> = {}

  // Map form fields to API fields and check for changes
  const fieldMappings = {
    name: 'nama',
    nik: 'nik',
    phone: 'no_telepon',
    bankAccount: 'no_rek',
    bankName: 'nama_bank',
    subdistrict: 'id_kelurahan',
    tps: 'id_tps',
    address: 'alamat',
    rw: 'rw',
    recommendation: 'rekomendasi'
  } as const

  // Check each field for changes
  for (const [formField, apiField] of Object.entries(fieldMappings)) {
    const currentValue = current[formField as keyof FormType]
    const originalValue = original[apiField as keyof Saksi]

    if (currentValue !== originalValue) {
      changes[apiField] = currentValue
    }
  }

  return Object.keys(changes).length > 0 ? changes : null
}

// eslint-disable-next-line react-refresh/only-export-components
export const removeUndefined = <T extends object>(obj: T): NoUndefined<Partial<T>> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined)) as NoUndefined<Partial<T>>
}

const getSaksiFromQueryData = (queryClient: QueryClient, id: string) => {
  // Get all queries that start with 'saksi'
  const results = queryClient.getQueriesData({ queryKey: ['saksi'] })

  // Flatten all saksi data from different queries
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const allSaksiData = results.reduce((acc: Saksi[], [_, queryData]) => {
    // Check if queryData is an array (multiple results) or single result
    if (Array.isArray(queryData)) {
      // Handle case where queryData is an array of results
      const paginatedData = queryData[1] as PaginatedData<Saksi>
      return [...acc, ...paginatedData.data]
    } else {
      // Handle case where queryData is a single paginated result
      const paginatedData = queryData as PaginatedData<Saksi>
      return [...acc, ...paginatedData.data]
    }
  }, [])

  // Find the specific saksi by id
  const initialData = allSaksiData.find((item) => item._id === id) || null

  return initialData
}

const SaksiForm = ({
  onClose,
  isSubmitting,
  setIsSubmitting
}: {
  onClose(): void
  isSubmitting: boolean
  setIsSubmitting: (value: boolean) => void
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id') || ''
  const queryClient = useQueryClient()
  const initialData = getSaksiFromQueryData(queryClient, id)
  const isInitialized = useRef(false)

  const { data: districts, isLoading: isLoadingDistricts } = useFetchAllDistricts()
  const { mutate: fetchSubdistricts, data: subdistricts, isPending: isLoadingSubdistricts } = useFetchSubdistricts()
  const { mutate: fetchTPS, data: tps, isPending: isLoadingTPS } = useFetchTps()
  const { mutateAsync: insert, isPending: isLoadingInsert } = useInsertSaksi()
  const { mutateAsync: update, isPending: isLoadingUpdate } = useUpdateSaksi()

  const isLoading = isLoadingDistricts || isLoadingSubdistricts || isLoadingInsert || isLoadingTPS || isLoadingUpdate

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      nik: '',
      phone: '',
      bankAccount: '',
      bankName: '',
      district: '',
      subdistrict: '',
      tps: '',
      address: '',
      recommendation: '',
      rw: ''
    }
  })

  const onSubmit = async (values: FormType) => {
    console.log({ values })
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      if (!id) {
        await insert({
          nama: values.name,
          kelurahan: values.subdistrict,
          nama_bank: values.bankName,
          nik: values.nik,
          no_rek: values.bankAccount,
          no_telepon: values.phone,
          tps: values.tps,
          alamat: values.address,
          rekomendasi: values.recommendation,
          rw: values.rw
        })
      } else {
        const changes = getChangedFields(values, initialData)

        const parsed = {
          tps: changes?.id_tps,
          kelurahan: changes?.id_kelurahan,
          ...changes
        }

        const params = removeUndefined(parsed)

        console.log({ params })

        if (params) {
          await update({
            id,
            ...params
          })
        }
      }

      onClose()
      setSearchParams({ id: '' })
    } catch (error) {
      console.log({ error })
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const initializeForm = async () => {
      if (!initialData) return

      // Set initial non-dependent fields first
      form.reset({
        bankAccount: initialData.no_rek,
        bankName: initialData.nama_bank,
        name: initialData.nama,
        nik: initialData.nik,
        phone: initialData.no_telepon,
        recommendation: initialData.rekomendasi,
        rw: initialData.rw,
        address: initialData.alamat,
        district: initialData.id_kecamatan,
        subdistrict: initialData.id_kelurahan,
        tps: initialData.id_tps
      })

      isInitialized.current = true
    }

    if (!isInitialized.current) {
      initializeForm()
    }
  }, [initialData, form, fetchSubdistricts, fetchTPS])

  const district = form.watch('district')
  const subdistrict = form.watch('subdistrict')
  useEffect(() => {
    if (initialData && !isInitialized.current) return
    if (district) {
      fetchSubdistricts(district)
      // Only reset if the district has changed from the initial value
      if (form.getValues('district') !== initialData?.id_kecamatan) {
        form.setValue('subdistrict', '')
        form.setValue('tps', '')
      }
    }
  }, [district, fetchSubdistricts, form, initialData])

  useEffect(() => {
    if (initialData && !isInitialized.current) return
    if (subdistrict) {
      fetchTPS(subdistrict)
      // Only reset if the subdistrict has changed from the initial value
      if (form.getValues('subdistrict') !== initialData?.id_kelurahan) {
        form.setValue('tps', '')
      }
    }
  }, [subdistrict, fetchTPS, form, initialData])

  return (
    <Form {...form}>
      <form
        id='saksi-form'
        onSubmit={form.handleSubmit(onSubmit, (err) => console.log({ err }))}
        className='space-y-4 [&_input]:border-grey-500'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Saksi</FormLabel>
              <FormControl>
                <Input placeholder='Nama Saksi' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-2 items-start gap-4 w-full'>
          <FormField
            control={form.control}
            name='nik'
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIK</FormLabel>
                <FormControl>
                  <Input placeholder='NIK' disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. Telepon</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ketikkan No. Telepon'
                    disabled={isLoading}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                      // Only allow valid inputs
                      if (value === '' || /^\d*$/.test(value)) {
                        field.onChange(value)
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-4 items-start gap-4 w-full'>
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Input placeholder='Alamat' disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='rw'
            render={({ field }) => (
              <FormItem>
                <FormLabel>RW</FormLabel>
                <FormControl>
                  <Input
                    placeholder='RW'
                    disabled={isLoading}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                      // Only allow valid inputs
                      if (value === '' || /^\d*$/.test(value)) {
                        field.onChange(value)
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='recommendation'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rekomendasi</FormLabel>
                <FormControl>
                  <Input placeholder='Rekomendasi' disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-2 items-start gap-4 w-full'>
          <FormField
            control={form.control}
            name='bankAccount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. Rekening</FormLabel>
                <FormControl>
                  <Input
                    placeholder='No. Rekening'
                    disabled={isLoading}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                      // Only allow valid inputs
                      if (value === '' || /^\d*$/.test(value)) {
                        field.onChange(value)
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='bankName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Bank</FormLabel>
                <FormControl>
                  <Input placeholder='Nama Bank' {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-[1fr_1fr_auto] items-start gap-4 w-full [&_button]:bg-background [&_button]:border-grey-500'>
          {districts && districts?.length > 0 && (
            <FormField
              control={form.control}
              name='district'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kecamatan TPS</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Pilih Kecamatan' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districts?.map((item) => (
                        <SelectItem key={item._id} value={item._id}>
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

          {subdistricts && subdistricts.length > 0 && (
            <FormField
              control={form.control}
              name='subdistrict'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kelurahan TPS</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange} disabled={isLoading || !district}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Pilih Kelurahan' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subdistricts?.map((item) => (
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

          {tps && tps.length > 0 && (
            <FormField
              control={form.control}
              name='tps'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TPS</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange} disabled={isLoading || !subdistrict}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Pilih TPS' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tps?.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          TPS {item.NO}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </form>
    </Form>
  )
}

export default SaksiForm
