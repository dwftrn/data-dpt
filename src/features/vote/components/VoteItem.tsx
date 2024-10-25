import TimeAttack from '@/assets/lets-icons_time-atack.svg'
import PemiluLogo from '@/assets/pemilu-logo.svg'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { TableCell, TableRow } from '@/components/ui/table'
import { PemiluWithCandidate } from '@/features/pemilu/service/pemilu.service'
import { Check, Pen, Upload, UserRound, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { Vote } from '../service/vote.service'

type Props = {
  data: Vote
  pemilu: PemiluWithCandidate
}

const VoteItem = ({ data, pemilu }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const imageRef = useRef<HTMLInputElement | null>(null)

  return (
    <>
      <TableRow className='[&>*:not(:first-child):not(:last-child)]:border [&>*:not(:first-child):not(:last-child)]:border-b-0'>
        <TableCell className='text-center font-semibold'>TPS {data.NO}</TableCell>
        {data.data_paslon.length > 0
          ? data.data_paslon.map((item) => (
              <TableCell key={item.id_paslon} className='text-center'>
                {editMode ? <Input className='max-w-16' value={item.jumlah} /> : item.jumlah}
              </TableCell>
            ))
          : pemilu?.paslon
              .sort((a, b) => Number(a.no_urut) - Number(b.no_urut))
              .map((item) => (
                <TableCell key={item.no_urut} className='text-center'>
                  {editMode ? <Input className='max-w-16' /> : '-'}
                </TableCell>
              ))}
        <TableCell className='text-center'>{data.count_dpt}</TableCell>
        <TableCell className='text-center'>{editMode ? <Input className='max-w-16' /> : data.sah || '-'}</TableCell>
        <TableCell className='text-center'>
          {editMode ? <Input className='max-w-16' /> : data.tidak_sah || '-'}
        </TableCell>
        <TableCell className='text-center'>
          {editMode ? (
            <div>
              <Button
                type='button'
                size='sm'
                className='gap-2 text-xs font-normal'
                onClick={() => imageRef.current?.click()}
              >
                <Upload className='size-4' />
                Upload
              </Button>
              <Input ref={imageRef} type='file' accept='image/jpeg, image/png' className='hidden' />
            </div>
          ) : (
            <Button variant='link' className='p-0 text-indigo-500'>
              Lihat
            </Button>
          )}
        </TableCell>
        <TableCell className='text-center'>
          {data.status === 0
            ? 'Belum Terverifikasi'
            : data.status === 1
            ? 'Terverifikasi'
            : data.status === 2
            ? 'Tertolak'
            : '-'}
        </TableCell>
        <TableCell className='flex items-center justify-center gap-1'>
          {!editMode ? (
            <>
              <Button type='button' variant='secondary' className='p-2 h-fit' onClick={() => setEditMode(true)}>
                <Pen className='size-4' />
              </Button>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button variant='outline'>Edit Profile</Button>
                </DialogTrigger>
                <DialogContent
                  withClose={false}
                  className='h-4/5 w-fit max-w-[70%] bg-black border-none !rounded-none grid grid-cols-[1fr_500px] p-0 gap-0'
                >
                  <div className='w-fit'>
                    <img
                      alt='c1'
                      src='https://s3-alpha-sig.figma.com/img/33e8/3c2d/1c17dd069d44034fd2abb4730fc71c03?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XkYxyhIJGUJCXlVH-tthbAm25Y5aI3666WWsebibz6T0I4yjM-7HQO2h8A73RYduQ~W~VuzLncEJR~A3BwcOCgLYX~oaEQq0jgjJO3hxCCgiz76Ls5zI5kcyK8WF8L0l680ZdRKkOY-vhImi4fibhLDArt9uoQR1E6gH4L4xTFY9nmC6eS~sthaQ~W3Akr8ys728S8~qL2cScYnGD6gAozOrpbYwHavcGYo6ddbYYQtmB5Qtjb0p4GdqeipBYa8NuW77N1PSieCfLjRwgvGIC39Ol6~Ulr5XKwlpuhP-qgLn7kxzFX5vDJ6d9idODXNYYAPGpaZnRa6tXcI-qt6gqw__'
                      className='h-full'
                    />
                  </div>
                  <div className='bg-white flex flex-col relative'>
                    <DialogHeader className='py-6 flex items-center justify-between flex-row px-8 border-b border-b-gray-500'>
                      <div className='flex items-center gap-3'>
                        <img alt='logo' src={PemiluLogo} className='size-8' />
                        <DialogTitle className='text-base font-bold'>
                          TPS 77 <span className='text-xs  font-normal'>(DPT 370)</span>
                        </DialogTitle>
                      </div>
                      <DialogDescription className='flex items-center gap-1.5 text-orange-500'>
                        <img alt='icon' src={TimeAttack} />
                        Belum Terverifikasi
                      </DialogDescription>
                    </DialogHeader>

                    <div className='py-6 space-y-4 border-b border-b-gray-500 px-8'>
                      <div>
                        <h1 className='font-bold text-sm'>Kelurahan Cihanjuang • Kecamatan Cimahi Utara</h1>
                        <p className='font-light text-sm'>Kota Cimahi • Provinsi Jawa Barat</p>
                      </div>
                      <div className='rounded-full bg-gradient-to-b from-white to-gray-100 shadow-custom px-4 py-2.5 flex items-center gap-3 w-fit text-sm'>
                        <div className='rounded-full bg-gray-900 p-1'>
                          <UserRound className='fill-white stroke-none size-4' />
                        </div>
                        <div className='font-bold'>Agus Muhtaram</div>
                        <div className='text-gray-300'>|</div>
                        <div>Saksi TPS 77</div>
                      </div>
                    </div>
                    <div className='py-6 px-8 space-y-6'>
                      <h1 className='text-base font-bold'>Perolehan Suara</h1>
                      <div className='space-y-4'>
                        <div className='grid grid-cols-[24px_40px_1fr_60px] items-center gap-4'>
                          <div className='rounded-full size-6 flex items-center justify-center bg-red-500 text-sm text-white'>
                            1
                          </div>
                          <img
                            src='https://s3-alpha-sig.figma.com/img/27da/0d11/18ddf5afc0eff5a696534679ee799491?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cLFnXc7ui0hwrriTFzyF6gKKDTXWfRstMVc11UFHTTE-mVNnsiVjTu41EvfV9zuVy0zO3KRJxLDgsEKC6OgizFz4GeEMFCM423~6tXuTtow2gcyUNHvLPqZtx7K2~k54g5KJ1Siw85DWGaKQ-XjoDRmfqEN7-vR4wvvGeJe3Su0e~Zp1s~I2iFiMLT3dTHaWVPLqtVp1tzaNpQNOn3mfCzKnRKkTHenpyG5yIcug8YkIloapmthPa~R1hUbn1Cqo5igPlcGF7QZwzf8Gr9mk9~g5E40-urgrV6mC2juWmvOnwOaWVtdRi0b-29AFMFGETZYLQv~n365pR9wDZ60X6Q__'
                            className='rounded-full size-10 object-cover'
                          />
                          <Progress value={80} className='w-full h-[18px]' />
                          <div className='w-[60px] text-end'>150</div>
                        </div>
                        <div className='grid grid-cols-[24px_40px_1fr_60px] items-center gap-4'>
                          <div className='rounded-full size-6 flex items-center justify-center bg-red-500 text-sm text-white'>
                            1
                          </div>
                          <img
                            src='https://s3-alpha-sig.figma.com/img/27da/0d11/18ddf5afc0eff5a696534679ee799491?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cLFnXc7ui0hwrriTFzyF6gKKDTXWfRstMVc11UFHTTE-mVNnsiVjTu41EvfV9zuVy0zO3KRJxLDgsEKC6OgizFz4GeEMFCM423~6tXuTtow2gcyUNHvLPqZtx7K2~k54g5KJ1Siw85DWGaKQ-XjoDRmfqEN7-vR4wvvGeJe3Su0e~Zp1s~I2iFiMLT3dTHaWVPLqtVp1tzaNpQNOn3mfCzKnRKkTHenpyG5yIcug8YkIloapmthPa~R1hUbn1Cqo5igPlcGF7QZwzf8Gr9mk9~g5E40-urgrV6mC2juWmvOnwOaWVtdRi0b-29AFMFGETZYLQv~n365pR9wDZ60X6Q__'
                            className='rounded-full size-10 object-cover'
                          />
                          <Progress value={80} className='w-full h-[18px]' />
                          <div className='w-[60px] text-end'>150</div>
                        </div>
                        <div className='grid grid-cols-[24px_40px_1fr_60px] items-center gap-4'>
                          <div className='rounded-full size-6 flex items-center justify-center bg-red-500 text-sm text-white'>
                            1
                          </div>
                          <img
                            src='https://s3-alpha-sig.figma.com/img/27da/0d11/18ddf5afc0eff5a696534679ee799491?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cLFnXc7ui0hwrriTFzyF6gKKDTXWfRstMVc11UFHTTE-mVNnsiVjTu41EvfV9zuVy0zO3KRJxLDgsEKC6OgizFz4GeEMFCM423~6tXuTtow2gcyUNHvLPqZtx7K2~k54g5KJ1Siw85DWGaKQ-XjoDRmfqEN7-vR4wvvGeJe3Su0e~Zp1s~I2iFiMLT3dTHaWVPLqtVp1tzaNpQNOn3mfCzKnRKkTHenpyG5yIcug8YkIloapmthPa~R1hUbn1Cqo5igPlcGF7QZwzf8Gr9mk9~g5E40-urgrV6mC2juWmvOnwOaWVtdRi0b-29AFMFGETZYLQv~n365pR9wDZ60X6Q__'
                            className='rounded-full size-10 object-cover'
                          />
                          <Progress value={80} className='w-full h-[18px]' />
                          <div className='w-[60px] text-end'>150</div>
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-between bg-[#E6F4F0] p-6 font-bold items-center'>
                      <h1 className='text-xs'>Total Suara Sah</h1>
                      <p className='text-lg'>370</p>
                    </div>
                    <div className='flex justify-between bg-[#FBE6E6] p-6 font-bold items-center'>
                      <h1 className='text-xs'>Total Suara Tidak Sah</h1>
                      <p className='text-lg'>370</p>
                    </div>

                    <div className='absolute bottom-0 py-6 px-8 border-t border-t-gray-500 flex justify-between items-center w-full'>
                      <div className='items-center flex gap-4'>
                        <Button variant='destructive' className='gap-2'>
                          <X className='size-4' />
                          Tolak
                        </Button>
                        <Button className='gap-2 bg-[#20A86B] hover:bg-[#20A86B]/90'>
                          <Check className='size-4' />
                          Verifikasi
                        </Button>
                      </div>
                      <Button variant='secondary' className='gap-2'>
                        Batal
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              {/* <Button
                variant='ghost'
                className='fixed top-10 right-10 z-[9999999999999999999999999999999999999] text-white'
              >
                <X />
              </Button> */}
            </>
          ) : (
            <>
              <Button type='button' variant='destructive' className='p-2 h-fit' onClick={() => setEditMode(false)}>
                <X className='size-4' />
              </Button>
              <Button
                type='button'
                className='p-2 h-fit bg-green-500 hover:bg-green-500/90 text-white'
                onClick={() => setEditMode(false)}
              >
                <Check className='size-4' />
              </Button>
            </>
          )}
        </TableCell>
      </TableRow>
    </>
  )
}

export default VoteItem
