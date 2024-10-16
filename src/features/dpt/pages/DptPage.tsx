import { DPT, DPTQuery } from '@/api/services'
import LoadingOverlay from '@/components/LoadingOverlay'
import { DataTablePagination } from '@/components/table/DataTablePagination'
import SortableTableHeader from '@/components/table/SortableTableHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import ChartSection from '@/features/components/ChartSection'
import { useDebounce } from '@/hooks/useDebounce'
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
import useFetchDPT from '../queries/useFetchDPT'
import useFetchProvinces from '../queries/useFetchProvinces'
import useFetchSubdistricts from '../queries/useFetchSubdistricts'
import useFetchTps from '../queries/useFetchTps'

const filterLabels = ['Provinsi', 'Kabupaten/Kota', 'Kecamatan', 'Kelurahan', 'TPS']

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
  const { mutate: fetchDPT, data, isPending: isLoadingDpt } = useFetchDPT()

  const isLoading =
    isLoadingProvinces || isLoadingCities || isLoadingDistricts || isLoadingSubdistricts || isLoadingTps || isLoadingDpt

  const [perPage, setPerPage] = React.useState(10)
  const [search, setSearch] = React.useState('')
  const debounceSearch = useDebounce(search, 500)
  const [selections, setSelections] = React.useState({
    province: '0',
    city: '0',
    district: '0',
    subdistrict: '0',
    tps: '0'
  })

  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data: data?.data || [], // Use filtered data
    columns,
    manualPagination: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting }
  })

  React.useEffect(() => {
    if (selections.province) fetchCities(selections.province)
    setSelections((prev) => ({
      province: prev.province,
      city: '0',
      district: '0',
      subdistrict: '0',
      tps: '0'
    }))
  }, [fetchCities, selections.province])

  React.useEffect(() => {
    if (selections.city) fetchDistricts(selections.city)
    setSelections((prev) => ({
      province: prev.province,
      city: prev.city,
      district: '0',
      subdistrict: '0',
      tps: '0'
    }))
  }, [fetchDistricts, selections.city])

  React.useEffect(() => {
    if (selections.district) fetchSubdistricts(selections.district)
    setSelections((prev) => ({
      province: prev.province,
      city: prev.city,
      district: prev.district,
      subdistrict: '0',
      tps: '0'
    }))
  }, [fetchSubdistricts, selections.district])

  React.useEffect(() => {
    if (selections.subdistrict) fetchTps(selections.subdistrict)
    setSelections((prev) => ({
      province: prev.province,
      city: prev.city,
      district: prev.district,
      subdistrict: prev.subdistrict,
      tps: '0'
    }))
  }, [fetchTps, selections.subdistrict])

  const fetchData = React.useMemo(
    () =>
      ({ page, perPage }: { page: number; perPage: number }) => {
        const query: DPTQuery = {
          page: page,
          per_page: perPage,
          name: debounceSearch,
          jenis_kelamin: '',
          id_provinsi: selections.city === '0' && selections.province !== '0' ? selections.province : '',
          id_kota: selections.district === '0' && selections.city !== '0' ? selections.city : '',
          id_kecamatan: selections.subdistrict === '0' && selections.district !== '0' ? selections.district : '',
          id_kelurahan: selections.tps === '0' && selections.subdistrict !== '0' ? selections.subdistrict : '',
          id_tps: selections.tps === '0' ? '' : selections.tps
        }

        fetchDPT(query)
      },
    [
      debounceSearch,
      fetchDPT,
      selections.city,
      selections.district,
      selections.province,
      selections.subdistrict,
      selections.tps
    ]
  )

  const onToFirstPage = () => {
    fetchData({
      page: 1,
      perPage: perPage
    })
  }

  const onToLastPage = () => {
    fetchData({
      page: data?.total_pages || 1,
      perPage: perPage
    })
  }

  const onNextPage = () => {
    const page = data?.current_page
    const lastPage = page === data?.total_pages
    if (lastPage) return

    fetchData({
      page: page ? page + 1 : 1,
      perPage: perPage
    })
  }

  const onPrevPage = () => {
    const page = data?.current_page
    if (page === 1) return
    fetchData({
      page: page ? page - 1 : 1,
      perPage: perPage
    })
  }

  React.useEffect(() => {
    fetchData({ page: 1, perPage: 10 })
  }, [fetchData])

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
          <ChartSection />
          <div className='space-y-4'>
            <div className='flex items-end gap-4'>
              {['province', 'city', 'district', 'subdistrict', 'tps'].map((field, index) => (
                <>
                  <div className='flex flex-col space-y-2'>
                    <Label className='text-xs capitalize'>{filterLabels[index]}</Label>
                    <Select
                      key={field}
                      value={selections[field as keyof typeof selections]}
                      onValueChange={(value) => handleSelectionChange(field as keyof typeof selections, value)}
                    >
                      <SelectTrigger className='capitalize'>
                        <SelectValue placeholder={filterLabels[index]} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='0'>Semua</SelectItem>
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
                          <SelectItem key={item.id} value={item.id}>
                            {'NO' in item ? (item.NO as number).toString().padStart(3, '0') : item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ))}

              <Button
                variant='outline'
                title='Bersihkan Filter'
                className='text-blue-500'
                onClick={() => {
                  setSearch('')
                  setSelections({
                    province: '0',
                    city: '0',
                    district: '0',
                    subdistrict: '0',
                    tps: '0'
                  })
                }}
              >
                Reset Filter
              </Button>
              <Input
                className='flex-1'
                placeholder='Search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className='mt-4 space-y-4'>
            <div className='border rounded'>
              <Table>
                <TableHeader>
                  <TableRow>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <React.Fragment key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        ))}
                      </React.Fragment>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className='text-center'>
                        Data tidak ditemukan
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <DataTablePagination
              table={table}
              page={data?.current_page}
              totalPage={data?.total_pages}
              onToFirstPage={onToFirstPage}
              onToLastPage={onToLastPage}
              onNext={onNextPage}
              onPrev={onPrevPage}
              setPerPage={(perPage) => {
                setPerPage(perPage)
                fetchData({ page: data?.current_page || 1, perPage })
              }}
            />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
