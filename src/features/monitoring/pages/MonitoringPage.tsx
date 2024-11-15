import BoxIcon from '@/assets/3d-box-icon.svg'
import CheckIcon from '@/assets/check-icon.svg'
import CloseIcon from '@/assets/close-icon.svg'
import TimeAttackIcon from '@/assets/time-attack-icon.svg'
import SelectPemilu from '@/components/SelectPemilu'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search } from 'lucide-react'

const MonitoringPage = () => {
  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center justify-between h-14 lg:h-[60px] -mt-4 md:-mt-6 2xl:-mt-8'>
        <h1 className='font-semibold text-lg'>Monitoring</h1>
        <div className='relative w-[375px]'>
          <Search className='absolute top-2.5 left-3 size-5' />
          <Input placeholder='Cari TPS...' className='bg-white border-grey-500 pl-10' />
          <Button variant='secondary' size='sm' className='absolute top-1.5 right-1 h-[30px] text-xs font-normal'>
            Cari
          </Button>
        </div>
        <SelectPemilu />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        <Card className='p-6 rounded-3xl border-0 border-b-4 border-success-700'>
          <CardContent className='p-0 flex flex-col items-center gap-3'>
            <img alt='icon' src={CheckIcon} />
            <h1 className='font-bold text-2xl'>150</h1>
            <p className='text-sm'>Terverifikasi</p>
          </CardContent>
        </Card>
        <Card className='p-6 rounded-3xl border-0 border-b-4 border-special-orange'>
          <CardContent className='p-0 flex flex-col items-center gap-3'>
            <img alt='icon' src={TimeAttackIcon} />
            <h1 className='font-bold text-2xl'>150</h1>
            <p className='text-sm'>Belum Terverifikasi</p>
          </CardContent>
        </Card>
        <Card className='p-6 rounded-3xl border-0 border-b-4 border-primary-red-700'>
          <CardContent className='p-0 flex flex-col items-center gap-3'>
            <img alt='icon' src={CloseIcon} />
            <h1 className='font-bold text-2xl'>150</h1>
            <p className='text-sm'>Ditolak</p>
          </CardContent>
        </Card>
        <Card className='p-6 rounded-3xl border-0 border-b-4 border-grey-700'>
          <CardContent className='p-0 flex flex-col items-center gap-3'>
            <img alt='icon' src={BoxIcon} />
            <h1 className='font-bold text-2xl'>150</h1>
            <p className='text-sm'>Belum Input</p>
          </CardContent>
        </Card>
      </div>

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
          <TableRow className='bg-white hover:bg-white'>
            <TableCell>
              <div className='flex flex-col text-xs font-normal'>
                <span>27 November 2024</span>
                <span>Pukul 20:00 WIB</span>
              </div>
            </TableCell>
            <TableCell>TPS 86</TableCell>
            <TableCell>
              <div className='flex flex-col'>
                <span>Cibabat, Cimahi Utara</span>
                <span className='text-xs'>Kota Cimahi, Jawa Barat</span>
              </div>
            </TableCell>
            <TableCell>Nanang Darkonang</TableCell>
            <TableCell>Saksi Luar</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  )
}

export default MonitoringPage
