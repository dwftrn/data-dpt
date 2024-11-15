import SelectPemilu from '@/components/SelectPemilu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search } from 'lucide-react'

const HistoryPage = () => {
  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center justify-between h-14 lg:h-[60px] -mt-4 md:-mt-6 2xl:-mt-8'>
        <h1 className='font-semibold text-lg'>Histori</h1>
        <div className='relative w-[375px]'>
          <Search className='absolute top-2.5 left-3 size-5' />
          <Input placeholder='Cari histori...' className='bg-white border-grey-500 pl-10' />
          <Button variant='secondary' size='sm' className='absolute top-1.5 right-1 h-[30px] text-xs font-normal'>
            Cari
          </Button>
        </div>
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
            <TableCell>Admin memverifikasi data perolehan suara</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  )
}

export default HistoryPage
