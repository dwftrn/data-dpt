import { CommonResponse } from '@/api/services'
import TimeAttack from '@/assets/lets-icons_time-atack.svg'
import PemiluLogo from '@/assets/pemilu-logo.svg'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { PemiluWithCandidate } from '@/features/pemilu/service/pemilu.service'
import useSearchParams from '@/hooks/useSearchParams'
import { cn } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { Check, ChevronLeft, ChevronRight, CircleCheck, UserRound, X, XCircle } from 'lucide-react'
import { SyntheticEvent, useEffect, useState } from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { Vote } from '../service/vote.service'

const VoteVerificationPopup = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const idPemilu = searchParams.get('pemilu')
  const subdistrict = searchParams.get('subdistrict')

  const [isOpen, setIsOpen] = useState(false)
  const [containerWidth, setContainerWidth] = useState('auto')
  const queryClient = useQueryClient()

  const votes = queryClient.getQueryData(['votes', idPemilu, subdistrict]) as CommonResponse<Vote[]> | undefined
  const vote = votes?.data.find((vote) => vote.id_suara === id)
  const pemilus = queryClient.getQueryData(['pemilu-list']) as PemiluWithCandidate[] | undefined
  const pemilu = pemilus?.find((item) => item._id === idPemilu)

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.target as HTMLImageElement
    // Calculate the width needed while maintaining aspect ratio within the 90vh height constraint
    const heightRatio = (90 * window.innerHeight) / 100 / img.naturalHeight
    const width = img.naturalWidth * heightRatio
    setContainerWidth(`${width}px`)
  }

  const handleNavigate = () => {
    navigate({
      pathname: `/input-vote`,
      search: createSearchParams(searchParams).toString()
    })
  }

  const handleClose = () => {
    setIsOpen(false)
    handleNavigate()
  }

  useEffect(() => {
    if (id) setIsOpen(true)
    else setIsOpen(false)
  }, [id])

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open)
          if (!open) {
            handleNavigate()
          }
        }}
      >
        <DialogContent
          withClose={false}
          className='h-[90vh] w-fit max-w-[90vw] bg-black border-none !rounded-none grid p-0 gap-0'
          style={{ gridTemplateColumns: `${containerWidth} 500px` }}
        >
          <div className='h-full w-full flex items-center justify-center bg-black'>
            <div className='relative w-full h-full'>
              <img
                alt='c1'
                src='https://s3-alpha-sig.figma.com/img/33e8/3c2d/1c17dd069d44034fd2abb4730fc71c03?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XkYxyhIJGUJCXlVH-tthbAm25Y5aI3666WWsebibz6T0I4yjM-7HQO2h8A73RYduQ~W~VuzLncEJR~A3BwcOCgLYX~oaEQq0jgjJO3hxCCgiz76Ls5zI5kcyK8WF8L0l680ZdRKkOY-vhImi4fibhLDArt9uoQR1E6gH4L4xTFY9nmC6eS~sthaQ~W3Akr8ys728S8~qL2cScYnGD6gAozOrpbYwHavcGYo6ddbYYQtmB5Qtjb0p4GdqeipBYa8NuW77N1PSieCfLjRwgvGIC39Ol6~Ulr5XKwlpuhP-qgLn7kxzFX5vDJ6d9idODXNYYAPGpaZnRa6tXcI-qt6gqw__'
                className='absolute h-full object-contain'
                onLoad={handleImageLoad}
              />
            </div>
          </div>

          <div className='bg-white flex flex-col h-[90vh]'>
            <DialogHeader className='py-4 flex items-center justify-between flex-row px-8 border-b border-b-gray-300 flex-shrink-0'>
              <div className='flex items-center gap-3'>
                <img alt='logo' src={PemiluLogo} className='size-8' />
                <DialogTitle className='text-base font-bold'>
                  TPS {vote?.NO} <span className='text-xs  font-normal'>(DPT {vote?.count_dpt})</span>
                </DialogTitle>
              </div>

              <DialogDescription
                className={cn('flex items-center gap-1.5 text-orange-500', {
                  'text-green-500': vote?.status === 1,
                  'text-red-500': vote?.status === 2
                })}
              >
                {vote?.status === 1 ? (
                  <CircleCheck className='size-5' />
                ) : vote?.status === 2 ? (
                  <XCircle className='size-5' />
                ) : (
                  <img alt='icon' src={TimeAttack} />
                )}

                {vote?.status === 2 ? (
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger>Tertolak</TooltipTrigger>
                    <TooltipContent side='bottom' className='dark'>
                      <p>{vote.alasan_reject}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : vote?.status === 1 ? (
                  'Terverifikasi'
                ) : (
                  'Belum Terverifikasi'
                )}
              </DialogDescription>
            </DialogHeader>

            <div className='py-4 space-y-4 border-b border-b-gray-300 px-8 flex-shrink-0'>
              <div>
                <h1 className='font-bold text-sm'>Kelurahan Cihanjuang • Kecamatan Cimahi Utara</h1>
                {pemilu?.kab_kota_name ? (
                  <p className='font-light text-sm'>
                    Kota {pemilu.kab_kota_name} • Provinsi {pemilu?.provinsi_name}
                  </p>
                ) : (
                  <p className='font-light text-sm'>Provinsi {pemilu?.provinsi_name}</p>
                )}
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

            <div className='flex-1 overflow-y-auto'>
              <div className='py-4 px-8 space-y-4'>
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
              <div className='flex justify-between bg-[#E6F4F0] p-6 py-4 font-bold items-center'>
                <h1 className='text-xs'>Total Suara Sah</h1>
                <p className='text-lg'>370</p>
              </div>
              <div className='flex justify-between bg-[#FBE6E6] p-6 py-4 font-bold items-center'>
                <h1 className='text-xs'>Total Suara Tidak Sah</h1>
                <p className='text-lg'>370</p>
              </div>
            </div>

            <div className='py-4 px-8 border-t border-t-gray-300 flex justify-between items-center w-full bg-white flex-shrink-0'>
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
              <Button variant='secondary' className='gap-2' onClick={handleClose}>
                Batal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className='fixed inset-0 pointer-events-none' style={{ zIndex: 9999 }}>
        {isOpen && (
          <>
            <div className='absolute top-5 right-5 pointer-events-auto'>
              <Button className='text-white p-0' size='icon' variant='ghost' onClick={handleClose}>
                <X />
              </Button>
            </div>
            <div className='absolute top-1/2 left-5 pointer-events-auto'>
              <Button className='rounded-full size-10 p-0' variant='secondary'>
                <ChevronLeft />
              </Button>
            </div>
            <div className='absolute top-1/2 right-5 pointer-events-auto'>
              <Button className='rounded-full size-10 p-0' variant='secondary'>
                <ChevronRight />
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default VoteVerificationPopup
