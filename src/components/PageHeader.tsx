import useFetchPemilu from '@/queries/useFetchPemilu'
import { useState } from 'react'
import LoadingOverlay from './LoadingOverlay'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

type Props = {
  title: string
  onSelected?(value: string): void
}

const PageHeader = ({ title, onSelected }: Props) => {
  const { data, isLoading: isLoadingFetchPemilu } = useFetchPemilu()
  const isLoading = isLoadingFetchPemilu

  const [selected, setSelected] = useState('')

  if (isLoading) return <LoadingOverlay />

  return (
    <div className='flex items-center justify-between'>
      <h1 className='font-semibold text-lg'>{title}</h1>
      <Select
        value={selected}
        onValueChange={(value) => {
          setSelected(value)
          onSelected?.(value)
        }}
      >
        <SelectTrigger className='capitalize w-1/4'>
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
