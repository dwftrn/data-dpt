import { Column } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../ui/button'

type Props<T> = {
  column: Column<T, unknown>
  label: string
}

const SortableTableHeader = <T,>({ column, label }: Props<T>) => {
  return (
    <Button variant='ghost' className='p-0' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {label}
      <ArrowUpDown className='ml-2 size-4' />
    </Button>
  )
}

export default SortableTableHeader
