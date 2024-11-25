import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import SelectPemilu from '@/components/SelectPemilu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useSearchParams from '@/hooks/useSearchParams'
import { useState } from 'react'
import useFetchHistory from '../queries/useFetchHistory'

const HistoryPage = () => {
  const [searchParams] = useSearchParams()
  const pemiluId = searchParams.get('pemilu') || ''
  const q = searchParams.get('q') || ''

  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const { data } = useFetchHistory({ id_pemilu: pemiluId, page, per_page: perPage, search: q })

  const histories = data?.data || []
  const totalPage = data?.total_pages || 1

  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center justify-between shrink-0'>
        <h1 className='font-semibold text-lg'>Histori</h1>
        <SearchBar />
        <SelectPemilu />
      </div>

      <Table className='mt-2'>
        <TableHeader>
          <TableRow className='bg-primary-blue-700 hover:bg-primary-blue-700 [&>*]:text-white [&>*:first-child]:rounded-tl-xl [&>*:last-child]:rounded-tr-xl'>
            <TableHead>Tanggal/Waktu</TableHead>
            <TableHead>TPS</TableHead>
            <TableHead>Lokasi TPS</TableHead>
            <TableHead>Keterangan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='[&>tr:last-child>td:first-child]:rounded-bl-xl [&>tr:last-child>td:last-child]:rounded-br-xl'>
          {histories.length > 0 ? (
            histories.map((history) => (
              <TableRow key={history._id} className='bg-white hover:bg-white'>
                <TableCell>
                  <div className='flex flex-col text-xs font-normal'>
                    <span>{Intl.DateTimeFormat('id', { dateStyle: 'long' }).format(new Date(history.time))}</span>
                    <span>
                      Pukul{' '}
                      {Intl.DateTimeFormat('id', {
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short'
                      }).format(new Date(history.time))}
                    </span>
                  </div>
                </TableCell>
                <TableCell>TPS {history.tps}</TableCell>
                <TableCell>
                  <div className='flex flex-col'>
                    <span>
                      {history.kelurahan}, {history.kecamatan}
                    </span>
                    <span className='text-xs'>
                      {history.kab_kota}, {history.provinsi}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{history.desc}</TableCell>
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

      <Pagination page={page} perPage={perPage} totalPage={totalPage} setPerPage={setPerPage} onPageChange={setPage} />
    </section>
  )
}

export default HistoryPage
