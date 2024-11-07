import useFetchPemilu from '@/features/pemilu/queries/useFetchPemilu'
import { useEffect, useState } from 'react'
import LoadingOverlay from './LoadingOverlay'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import useSearchParams from '@/hooks/useSearchParams'

type Props = {
  title: string
  onSelected?(value: string): void
}

const PageHeader = ({ title, onSelected }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const pemilu = searchParams.get('pemilu') || ''

  const { data, isLoading: isLoadingFetchPemilu } = useFetchPemilu()
  const isLoading = isLoadingFetchPemilu

  const [selected, setSelected] = useState(pemilu)

  useEffect(() => {
    setSearchParams({ pemilu: selected })
  }, [selected, setSearchParams])

  useEffect(() => {
    if (!selected) {
      setSelected(data?.at(0)?._id || pemilu)
    }
  }, [data, pemilu, selected])

  if (isLoading) return <LoadingOverlay />

  return (
    <div className='flex items-center justify-between h-14 lg:h-[60px] -mt-4 md:-mt-6 2xl:-mt-8'>
      <h1 className='font-semibold text-lg'>{title}</h1>
      <Select
        value={selected}
        onValueChange={(value) => {
          setSelected(value)
          onSelected?.(value)
        }}
      >
        <SelectTrigger
          data-selected={Boolean(selected)}
          className='data-[selected=true]:ring-2 capitalize w-1/4 text-left'
        >
          <SelectValue placeholder='Pilih Pemilu' />
        </SelectTrigger>
        <SelectContent>
          {data?.map((item) => (
            <SelectItem key={item._id} value={item._id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default PageHeader
