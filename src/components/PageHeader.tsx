import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const PageHeader = ({ title }: { title: string }) => {
  return (
    <div className='flex items-center justify-between'>
      <h1 className='font-semibold text-lg'>{title}</h1>
      <Select>
        <SelectTrigger className='capitalize w-1/4'>
          <SelectValue placeholder='Pilih Pemilu' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='0'>Semua</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default PageHeader
