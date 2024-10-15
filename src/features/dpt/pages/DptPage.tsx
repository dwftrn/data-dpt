import { DPT } from '@/api/services'
import LoadingOverlay from '@/components/LoadingOverlay'
import { DataTablePagination } from '@/components/table/DataTablePagination'
import SortableTableHeader from '@/components/table/SortableTableHeader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import * as React from 'react'
import useFetchCities from '../queries/useFetchCities'
import useFetchDistricts from '../queries/useFetchDistricts'
import useFetchProvinces from '../queries/useFetchProvinces'
import useFetchSubdistricts from '../queries/useFetchSubdistricts'
import useFetchTps from '../queries/useFetchTps'

const filterLabels = ['PROVINSI', 'KABUPATEN/KOTA', 'KECAMATAN', 'KELURAHAN', 'TPS']

const data: DPT[] = [
  {
    id: 'm5gr84i9',
    nama: 'ATANASIUS ARTESIS XAVIER HANDARU',
    jenis_kelamin: 'L',
    usia: 19,
    alamat: 'JL. PADAT KARYA KP. PASIR KUNTUL',
    rt: 1,
    rw: 1
  },
  {
    id: 'm5gr84i8',
    nama: 'ATANASIUS ARTESIS XAVIER HANDARU',
    jenis_kelamin: 'L',
    usia: 19,
    alamat: 'JL. PADAT KARYA KP. PASIR KUNTUL',
    rt: 1,
    rw: 1
  },
  {
    id: 'm5gr84i7',
    nama: 'ATANASIUS ARTESIS XAVIER HANDARU',
    jenis_kelamin: 'L',
    usia: 19,
    alamat: 'JL. PADAT KARYA KP. PASIR KUNTUL',
    rt: 1,
    rw: 1
  }
]

const columns: ColumnDef<DPT>[] = [
  {
    accessorKey: 'no',
    header: 'NO.',
    cell: ({ row }) => <div className='capitalize'>{row.index + 1}</div>
  },
  {
    accessorKey: 'nama',
    header: ({ column }) => <SortableTableHeader column={column} label='NAMA' />,
    cell: ({ row }) => <div className='uppercase'>{row.getValue('nama')}</div>
  },
  {
    accessorKey: 'jenis_kelamin',
    header: ({ column }) => <SortableTableHeader column={column} label='JENIS KELAMIN' />,
    cell: ({ row }) => <div className='uppercase text-center'>{row.getValue('jenis_kelamin')}</div>
  },
  {
    accessorKey: 'usia',
    header: ({ column }) => <SortableTableHeader column={column} label='USIA' />,
    cell: ({ row }) => <div className='uppercase'>{row.getValue('usia')}</div>
  },
  {
    accessorKey: 'alamat',
    header: ({ column }) => <SortableTableHeader column={column} label='DUSUN/ALAMAT' />,
    cell: ({ row }) => <div className='uppercase'>{row.getValue('alamat')}</div>
  },
  {
    accessorKey: 'rt',
    header: ({ column }) => <SortableTableHeader column={column} label='RT' />,
    cell: ({ row }) => <div className='uppercase'>{row.getValue('rt')}</div>
  },
  {
    accessorKey: 'rw',
    header: ({ column }) => <SortableTableHeader column={column} label='RW' />,
    cell: ({ row }) => <div className='uppercase'>{row.getValue('rw')}</div>
  }
]

export function DptPage() {
  const { data: provinces, isLoading: isLoadingProvinces } = useFetchProvinces()
  const { mutate: fetchCities, data: cities, isPending: isLoadingCities } = useFetchCities()
  const { mutate: fetchDistricts, data: districts, isPending: isLoadingDistricts } = useFetchDistricts()
  const { mutate: fetchSubdistricts, data: subdistricts, isPending: isLoadingSubdistricts } = useFetchSubdistricts()
  const { mutate: fetchTps, data: tps, isPending: isLoadingTps } = useFetchTps()

  const isLoading = isLoadingProvinces || isLoadingCities || isLoadingDistricts || isLoadingSubdistricts || isLoadingTps

  const [selections, setSelections] = React.useState({
    province: '',
    city: '',
    district: '',
    subdistrict: '',
    tps: ''
  })

  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting }
  })

  React.useEffect(() => {
    if (!isLoadingProvinces) setSelections((prev) => ({ ...prev, province: provinces?.at(0)?.id || '' }))
  }, [isLoadingProvinces, provinces])

  React.useEffect(() => {
    if (selections.province) fetchCities(selections.province)
  }, [fetchCities, selections.province])

  React.useEffect(() => {
    if (selections.city) fetchDistricts(selections.city)
  }, [fetchDistricts, selections.city])

  React.useEffect(() => {
    if (selections.district) fetchSubdistricts(selections.district)
  }, [fetchSubdistricts, selections.district])

  React.useEffect(() => {
    if (selections.subdistrict) fetchTps(selections.subdistrict)
  }, [fetchTps, selections.subdistrict])

  const handleSelectionChange = (field: keyof typeof selections, value: string) => {
    setSelections((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <Card>
        <CardContent>
          <CardHeader className='px-0'>
            <CardTitle>Daftar Pemilih Tetap</CardTitle>
            <CardDescription className='text-xs'>
              Pemilihan Gubernur dan Wakil Gubernur Jawa Barat serta Pemilihan Walikota dan Wakil Walikota Cimahi Tahun
              2024
            </CardDescription>
          </CardHeader>
          <div className='space-y-4'>
            <div className='flex items-center gap-4'>
              {['province', 'city', 'district', 'subdistrict', 'tps'].map((field, index) => (
                <Select
                  key={field}
                  value={selections[field as keyof typeof selections]}
                  onValueChange={(value) => handleSelectionChange(field as keyof typeof selections, value)}
                >
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder={filterLabels[index]} />
                  </SelectTrigger>
                  <SelectContent>
                    {Boolean(
                      field === 'province'
                        ? provinces
                        : field === 'city'
                        ? cities
                        : field === 'district'
                        ? districts
                        : field === 'subdistrict'
                        ? subdistricts
                        : tps
                    ) === false && <div className='p-2 text-xs'>Pilih filter sebelumnya</div>}

                    {(field === 'province'
                      ? provinces
                      : field === 'city'
                      ? cities
                      : field === 'district'
                      ? districts
                      : field === 'subdistrict'
                      ? subdistricts
                      : tps
                    )?.map((item) => (
                      <SelectItem key={item.id} value={item.id} className='uppercase'>
                        {'NO' in item ? (item.NO as number).toString().padStart(3, '0') : item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
              <Input placeholder='Cari nama...' />
            </div>
            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className='h-24 text-center'>
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <DataTablePagination table={table} />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
