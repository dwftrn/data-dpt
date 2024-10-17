import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const PageFilter = () => {
  const list = Array.from({ length: 4 })
  return (
    <div className='grid grid-cols-4 items-center gap-4'>
      {list.map((_, index) => (
        <div className={cn({ 'flex items-center gap-2': index === list.length - 1 })}>
          <Select key={index}>
            <SelectTrigger className='capitalize w-full'>
              <SelectValue placeholder='Pilih Pemilu' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='0'>Semua</SelectItem>
            </SelectContent>
          </Select>
          {index === list.length - 1 && (
            <Button variant='outline' className='text-blue-500'>
              Reset Filter
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}

export default PageFilter
