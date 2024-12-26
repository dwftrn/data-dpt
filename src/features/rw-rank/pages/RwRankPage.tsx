import LoadingOverlay from '@/components/LoadingOverlay'
import SelectPemilu from '@/components/SelectPemilu'
import { DataTablePagination } from '@/components/table/DataTablePagination'
import SortableTableHeader from '@/components/table/SortableTableHeader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import * as React from 'react'
import useFetchRwRank from '../queries/useFetchRwRank'
import { RwRank } from '../services/rw.service'

const RwRankPage = () => {
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: 'paslon-2',
      desc: true
    }
  ])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const { data, isLoading } = useFetchRwRank()

  const ranks = data ?? []

  const columns: ColumnDef<RwRank>[] = React.useMemo(() => {
    const dynamicColumns: ColumnDef<RwRank>[] =
      data?.[0]?.data_paslon?.map((paslon) => ({
        id: `paslon-${paslon.no_urut}`,
        accessorFn: (row) => {
          const paslonData = row.data_paslon.find((p) => p.no_urut === paslon.no_urut)
          return paslonData?.jumlah ?? 0
        },
        header: ({ column }) => <SortableTableHeader column={column} label={`Suara No. Urut ${paslon.no_urut}`} />,
        cell: ({ getValue }) => <div>{getValue() as number} Suara</div>
      })) ?? []

    return [
      {
        accessorKey: 'rw',
        header: 'RW',
        cell: ({ row }) => <div className='capitalize'>RW {row.getValue('rw')}</div>
      },
      ...dynamicColumns,
      {
        accessorKey: 'kelurahan',
        header: ({ column }) => <SortableTableHeader column={column} label='Kelurahan' />,
        cell: ({ row }) => <div className='uppercase'>{row.getValue('kelurahan')}</div>
      },
      {
        accessorKey: 'kecamatan',
        header: ({ column }) => <SortableTableHeader column={column} label='Kecamatan' />,
        cell: ({ row }) => <div className='uppercase'>{row.getValue('kecamatan')}</div>
      },
      {
        accessorKey: 'sah',
        header: ({ column }) => <SortableTableHeader column={column} label='Suara Sah' />,
        cell: ({ row }) => <div className='uppercase'>{row.getValue('sah')}</div>
      },
      {
        accessorKey: 'tidak_sah',
        header: ({ column }) => <SortableTableHeader column={column} label='Suara Tidak Sah' />,
        cell: ({ row }) => <div className='uppercase'>{row.getValue('tidak_sah')}</div>
      }
    ]
  }, [data])

  const table = useReactTable({
    data: ranks,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      sorting,
      columnFilters,
      columnVisibility
    }
  })

  if (isLoading) return <LoadingOverlay />

  return (
    <section className='w-full relative flex flex-col gap-4'>
      <div className='flex items-center justify-between h-14 lg:h-[60px] -mt-4 md:-mt-6 2xl:-mt-8'>
        <h1 className='font-semibold text-lg'>Peringkat RW</h1>
        {/* <div className='relative w-[375px]'>
          <Search className='absolute top-2.5 left-3 size-5' />
          <Input
            placeholder='Cari RW...'
            className='bg-white border-grey-500 pl-10'
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
          />
        </div> */}
        <SelectPemilu />
      </div>
      <div className='rounded-md border'>
        <Table className='overflow-y-hidden'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className='bg-primary-blue-700 hover:bg-primary-blue-700 [&>*]:text-white [&>*:first-child]:rounded-tl-xl [&>*:last-child]:rounded-tr-xl'
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='[&>tr:last-child>td:first-child]:rounded-bl-xl [&>tr:last-child>td:last-child]:rounded-br-xl'>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className='bg-white hover:bg-white'>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className='bg-white hover:bg-white'>
                <TableCell colSpan={4} className='text-center'>
                  Belum ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </section>
  )
}

export default RwRankPage
