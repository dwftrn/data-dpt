import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SaksiFormDialog from '../components/SaksiFormDialog'
import SaksiImportDialog from '../components/SaksiImportDialog'
import useFetchSaksi from '../queries/useFetchSaksi'

const SaksiPage = () => {
  const [searchParams] = useSearchParams()
  // const pemiluId = searchParams.get('pemilu') || ''
  const q = searchParams.get('q') || ''

  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const { data } = useFetchSaksi({ page, per_page: perPage, search: q })

  const saksi = data?.data || []
  const totalPage = data?.total_pages || 1

  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center gap-9 justify-between h-14 lg:h-[60px] -mt-4 md:-mt-6 2xl:-mt-8'>
        <h1 className='font-semibold text-lg'>Data Saksi</h1>
        <SearchBar placeholder='Cari TPS...' />
        <div className='flex items-center gap-6 justify-end'>
          {/* <SelectPemilu /> */}
          <SaksiImportDialog />
          <SaksiFormDialog />
        </div>
      </div>

      <Table className='mt-2'>
        <TableHeader>
          <TableRow className='bg-primary-blue-700 hover:bg-primary-blue-700 [&>*]:text-white [&>*:first-child]:rounded-tl-xl [&>*:last-child]:rounded-tr-xl'>
            <TableHead>Nama/NIK</TableHead>
            <TableHead>Jabatan</TableHead>
            <TableHead>No. Telepon</TableHead>
            <TableHead>No. Rekening</TableHead>
            <TableHead>TPS</TableHead>
            <TableHead>Lokasi TPS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='[&>tr:last-child>td:first-child]:rounded-bl-xl [&>tr:last-child>td:last-child]:rounded-br-xl'>
          {saksi.map((item) => (
            <TableRow className='bg-white hover:bg-white'>
              <TableCell>
                <div className='flex flex-col'>
                  <span>{item.nama}</span>
                  <span className='text-xs font-normal'>{item.nik}</span>
                </div>
              </TableCell>
              <TableCell>{item.is_saksi_luar ? 'Saksi Luar' : 'Saksi Dalam'}</TableCell>
              <TableCell>{item.no_telepon}</TableCell>
              <TableCell>
                <div className='flex flex-col'>
                  <span>{item.no_rek}</span>
                  <span className='text-xs font-normal'>{item.nama_bank}</span>
                </div>
              </TableCell>
              <TableCell>TPS {item.tps}</TableCell>
              <TableCell>
                <div className='flex flex-col'>
                  <span>
                    {item.kelurahan}, {item.kecamatan}
                  </span>
                  <span className='text-xs font-normal'>
                    {item.kab_kota}, {item.provinsi}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination page={page} perPage={perPage} totalPage={totalPage} setPerPage={setPerPage} onPageChange={setPage} />
    </section>
  )
}

export default SaksiPage
