import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

type Props = {
  page: number
  perPage: number
  totalPage: number
  setPerPage(perPage: number): void
  onPageChange(page: number): void
  pageSizes?: number[]
}

const Pagination = ({
  page,
  perPage,
  totalPage,
  setPerPage,
  onPageChange,
  pageSizes = [10, 20, 30, 40, 50]
}: Props) => {
  const toNextPage = () => {
    if (page === totalPage) return
    onPageChange(page + 1)
  }

  const toPrevPage = () => {
    if (page === 1) return
    onPageChange(page - 1)
  }

  const toFirstPage = () => {
    if (page === 1) return
    onPageChange(1)
  }

  const toLastPage = () => {
    if (page === totalPage) return
    onPageChange(totalPage)
  }

  return (
    <div className='flex items-center justify-end px-2'>
      <div className='flex items-center space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>Perhalaman</p>
          <Select value={`${perPage}`} onValueChange={(value) => setPerPage(+value)}>
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={perPage} />
            </SelectTrigger>
            <SelectContent side='top'>
              {pageSizes.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center justify-center text-sm font-medium'>
          Halaman {page} dari {totalPage}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden size-8 p-0 lg:flex'
            onClick={() => toFirstPage()}
            disabled={page === 1}
          >
            <span className='sr-only'>Go to first page</span>
            <ChevronsLeft className='size-4' />
          </Button>
          <Button variant='outline' className='size-8 p-0' onClick={() => toPrevPage()} disabled={page === 1}>
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeft className='size-4' />
          </Button>
          <Button variant='outline' className='size-8 p-0' onClick={() => toNextPage()} disabled={page === totalPage}>
            <span className='sr-only'>Go to next page</span>
            <ChevronRight className='size-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden size-8 p-0 lg:flex'
            onClick={() => toLastPage()}
            disabled={page === totalPage}
          >
            <span className='sr-only'>Go to last page</span>
            <ChevronsRight className='size-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Pagination
