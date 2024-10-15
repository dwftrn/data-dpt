import { Table } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type DataTablePaginationProps<TData> = {
  table: Table<TData>
  page?: number
  totalPage?: number
  onToFirstPage?(): void
  onToLastPage?(): void
  onNext?(): void
  onPrev?(): void
  setPerPage?(perPage: number): void
}

export function DataTablePagination<TData>({
  table,
  page,
  totalPage,
  onToFirstPage,
  onToLastPage,
  onNext,
  onPrev,
  setPerPage
}: DataTablePaginationProps<TData>) {
  return (
    <div className='flex items-center justify-end px-2'>
      <div className='flex items-center space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>Baris perhalaman</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
              setPerPage?.(Number(value))
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center justify-center text-sm font-medium'>
          Halaman {page ? page : table.getState().pagination.pageIndex + 1} dari{' '}
          {totalPage ? totalPage : table.getPageCount()}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden size-8 p-0 lg:flex'
            onClick={() => {
              table.setPageIndex(0)
              onToFirstPage?.()
            }}
            disabled={!page ? !table.getCanPreviousPage() : page === 1}
          >
            <span className='sr-only'>Go to first page</span>
            <ChevronsLeft className='size-4' />
          </Button>
          <Button
            variant='outline'
            className='size-8 p-0'
            onClick={() => {
              table.previousPage()
              onPrev?.()
            }}
            disabled={!page ? !table.getCanPreviousPage() : page === 1}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeft className='size-4' />
          </Button>
          <Button
            variant='outline'
            className='size-8 p-0'
            onClick={() => {
              table.nextPage()
              onNext?.()
            }}
            disabled={!page ? !table.getCanNextPage() : page === totalPage}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRight className='size-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden size-8 p-0 lg:flex'
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1)
              onToLastPage?.()
            }}
            disabled={!page ? !table.getCanNextPage() : page === totalPage}
          >
            <span className='sr-only'>Go to last page</span>
            <ChevronsRight className='size-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
