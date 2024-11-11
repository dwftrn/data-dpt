import useFetchPemilu from '@/features/pemilu/queries/useFetchPemilu'
import useSearchParams from '@/hooks/useSearchParams'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const SelectPemilu = ({ onSelected, className }: { onSelected?(value: string): void; className?: string }) => {
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

  return (
    <Select
      value={selected}
      onValueChange={(value) => {
        setSelected(value)
        onSelected?.(value)
      }}
    >
      <SelectTrigger
        data-selected={Boolean(selected)}
        disabled={!data || data?.length === 0 || isLoading}
        className={cn(
          'data-[selected=true]:ring-2 capitalize w-1/4 text-left',
          { 'animate-pulse': isLoading },
          className
        )}
      >
        <SelectValue placeholder='Pilih Pemilu' />
      </SelectTrigger>
      <SelectContent className='max-w-xs md:max-w-lg'>
        {data?.map((item) => (
          <SelectItem key={item._id} value={item._id}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectPemilu
