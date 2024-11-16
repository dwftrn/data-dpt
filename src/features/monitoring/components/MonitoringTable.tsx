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

  const { data } = useFetchUnverifiedVotes(pemiluId)

  const unverified = data?.data.filter((item) => item.status === 0)
  console.log({ unverified })

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
          {unverified?.map((item) => (
            <TableRow key={item.id_suara} className='bg-white hover:bg-white'>
              <TableCell>
                <div className='flex flex-col text-xs font-normal'>
                  <span>27 November 2024</span>
                  <span>Pukul 20:00 WIB</span>
                </div>
              </TableCell>
              <TableCell>TPS {item.NO}</TableCell>
              <TableCell>
                <div className='flex flex-col'>
                  <span>
                    {item.kelurahan}, {item.kecamatan}
                  </span>
                  <span className='text-xs'>Kota Cimahi, Jawa Barat</span>
                </div>
              </TableCell>
              <TableCell>Nanang Darkonang</TableCell>
              <TableCell>Saksi Luar</TableCell>
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
          ))}
        </TableBody>
      </Table>
      {unverified && <VoteVerificationPopup unverified={unverified as Vote[]} />}
    </>
  )
}

export default MonitoringTable
