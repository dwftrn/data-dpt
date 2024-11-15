import SelectPemilu from '@/components/SelectPemilu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search } from 'lucide-react'
import SaksiFormDialog from '../components/SaksiFormDialog'
import SaksiImportDialog from '../components/SaksiImportDialog'

const SaksiPage = () => {
  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center gap-9 justify-between h-14 lg:h-[60px] -mt-4 md:-mt-6 2xl:-mt-8'>
        <h1 className='font-semibold text-lg'>Data Saksi</h1>
        <div className='relative w-[375px]'>
          <Search className='absolute top-2.5 left-3 size-5' />
          <Input placeholder='Cari TPS...' className='bg-white border-grey-500 pl-10' />
          <Button variant='secondary' size='sm' className='absolute top-1.5 right-1 h-[30px] text-xs font-normal'>
            Cari
          </Button>
        </div>
        <div className='flex items-center gap-6 justify-end'>
          <SelectPemilu />
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
          <TableRow className='bg-white hover:bg-white'>
            <TableCell>
              <div className='flex flex-col'>
                <span>Nanang Darkonang</span>
                <span className='text-xs font-normal'>3267127601273897123</span>
              </div>
            </TableCell>
            <TableCell>Saksi Luar</TableCell>
            <TableCell>085155399566</TableCell>
            <TableCell>
              <div className='flex flex-col'>
                <span>1681269812381723</span>
                <span className='text-xs font-normal'>Bank BCA</span>
              </div>
            </TableCell>
            <TableCell>TPS 86</TableCell>
            <TableCell>
              <div className='flex flex-col'>
                <span>Cibabat, Cimahi Utara</span>
                <span className='text-xs font-normal'>Kota Cimahi, Jawa Barat</span>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  )
}

export default SaksiPage
