import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import C1Preview from '@/features/vote/components/C1Preview'
import useSearchParams from '@/hooks/useSearchParams'
import useFetchUnverifiedVotes from '../queries/useFetchUnverifiedVotes'
import { Button } from '@/components/ui/button'
import { createSearchParams, useNavigate } from 'react-router-dom'
import VoteVerificationPopup from '@/features/vote/components/VoteVerificationPopup'
import { Vote } from '@/features/vote/service/vote.service'

const MonitoringTable = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const pemiluId = searchParams.get('pemilu') || ''
  const district = searchParams.get('district') || '0'
  const subdistrictParams = searchParams.get('subdistricts') || ''
  const subdistrictArray = subdistrictParams ? subdistrictParams.split(',') : []

  const { data } = useFetchUnverifiedVotes(pemiluId)

  const unverified = data?.data.filter((item) => item.status === 0) || []

  const filter = () => {
    if (subdistrictArray.length > 0 && subdistrictArray[0] !== '0') {
      return unverified.filter((item) => subdistrictArray.includes(item.id_kelurahan))
    } else if (district && district !== '0') {
      return unverified.filter((item) => item.id_kecamatan === district)
    }

    return unverified
  }

  const filtered = filter()

  return (
    <>
      <Table className='mt-2'>
        <TableHeader>
          <TableRow className='bg-primary-blue-700 hover:bg-primary-blue-700 [&>*]:text-white [&>*:first-child]:rounded-tl-xl [&>*:last-child]:rounded-tr-xl'>
            <TableHead>Tanggal/Waktu</TableHead>
            <TableHead>TPS</TableHead>
            <TableHead>Lokasi TPS</TableHead>
            <TableHead>Nama Petugas</TableHead>
            <TableHead>Jabatan</TableHead>
            <TableHead>C1</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='[&>tr:last-child>td:first-child]:rounded-bl-xl [&>tr:last-child>td:last-child]:rounded-br-xl'>
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <TableRow key={item.id_suara} className='bg-white hover:bg-white'>
                <TableCell>
                  <div className='flex flex-col text-xs font-normal'>
                    <span>{Intl.DateTimeFormat('id', { dateStyle: 'long' }).format(new Date(item.time_vote))}</span>
                    <span>
                      Pukul{' '}
                      {Intl.DateTimeFormat('id', {
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short'
                      }).format(new Date(item.time_vote))}
                    </span>
                  </div>
                </TableCell>
                <TableCell>TPS {item.NO}</TableCell>
                <TableCell>
                  <div className='flex flex-col'>
                    <span>
                      {item.kelurahan}, {item.kecamatan}
                    </span>
                    <span className='text-xs'>
                      {item.kab_kota}, {item.provinsi}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{item.nama_petugas}</TableCell>
                <TableCell>{item.jabatan}</TableCell>
                <TableCell>
                  <C1Preview data={item} />
                </TableCell>
                <TableCell>
                  <Button
                    type='button'
                    variant='secondary'
                    className='p-2 h-fit bg-orange-500 hover:bg-orange-500/90 text-white text-xs'
                    onClick={() =>
                      navigate({
                        pathname: `/monitoring/${item.id_suara}`,
                        search: createSearchParams(searchParams).toString()
                      })
                    }
                  >
                    Verifikasi
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className='bg-white hover:bg-white'>
              <TableCell colSpan={7} className='text-center'>
                Belum ada data.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {filtered && <VoteVerificationPopup unverified={filtered as Vote[]} />}
    </>
  )
}

export default MonitoringTable
