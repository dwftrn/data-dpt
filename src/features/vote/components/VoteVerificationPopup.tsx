import TimeAttack from '@/assets/lets-icons_time-atack.svg'
import PemiluLogo from '@/assets/pemilu-logo.svg'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import useSearchParams from '@/hooks/useSearchParams'
import { cn } from '@/lib/utils'
import { Check, ChevronLeft, ChevronRight, CircleCheck, UserRound, X, XCircle } from 'lucide-react'
import { SyntheticEvent, useEffect, useState } from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import useFetchVoteDetail from '../queries/useFetchVoteDetail'
import useUpdateVote from '../queries/useUpdateVote'
import { Vote } from '../service/vote.service'

const VoteVerificationPopup = ({ unverified }: { unverified: Vote[] }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [isOpen, setIsOpen] = useState(false)
  const [containerWidth, setContainerWidth] = useState('auto')

  const { data } = useFetchVoteDetail({ id: id ?? '' })
  const { mutate: update } = useUpdateVote()

  const [rejectReason, setRejectReason] = useState('')

  const currentIndex = unverified.findIndex((item) => item.id_suara === id)

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.target as HTMLImageElement
    // Calculate the width needed while maintaining aspect ratio within the 90vh height constraint
    const heightRatio = (90 * window.innerHeight) / 100 / img.naturalHeight
    const width = img.naturalWidth * heightRatio

    console.log({ width })
    // setContainerWidth(`${width}px`)
    const halfScreen = (visualViewport?.width || 1280) * 0.5
    if (width > halfScreen) {
      setContainerWidth(`${halfScreen}px`)
    } else {
      setContainerWidth(`${width}px`)
    }
  }

  const handleNavigate = (id?: string) => {
    navigate({
      pathname: id ? `/input-vote/${id}` : '/input-vote',
      search: createSearchParams(searchParams).toString()
    })
  }

  const handleClose = () => {
    setIsOpen(false)
    handleNavigate()
  }

  const handleVerify = async () => {
    if (!id) return

    update({ id, status: 1 })
  }

  const handleReject = async () => {
    if (!id) return

    update({ id, status: 2, alasan_reject: rejectReason })
  }

  const handleNext = () => {
    if (currentIndex === unverified.length - 1) return

    handleNavigate(unverified[currentIndex + 1].id_suara)
  }

  const handlePrev = () => {
    if (currentIndex === 0) return

    handleNavigate(unverified[currentIndex - 1].id_suara)
  }

  useEffect(() => {
    if (id) setIsOpen(true)
    else setIsOpen(false)
  }, [id])

  if (!data) return <></>

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
              <img alt='c1' src={data.c1} className='absolute h-full object-contain' onLoad={handleImageLoad} />
            </div>
          </div>

          <div className='bg-white flex flex-col h-[90vh]'>
            <DialogHeader className='py-4 flex items-center justify-between flex-row px-8 border-b border-b-gray-300 flex-shrink-0'>
              <div className='flex items-center gap-3'>
                <img alt='logo' src={PemiluLogo} className='size-8' />
                <DialogTitle className='text-base font-bold'>
                  {data?.nama_tps} <span className='text-xs  font-normal'>(DPT {data.jumlah_dpt_tps})</span>
                </DialogTitle>
              </div>

              <DialogDescription
                className={cn('flex items-center gap-1.5 text-orange-500', {
                  'text-green-500': data?.status === 1,
                  'text-red-500': data?.status === 2
                })}
              >
                {data?.status === 1 ? (
                  <CircleCheck className='size-5' />
                ) : data?.status === 2 ? (
                  <XCircle className='size-5' />
                ) : (
                  <img alt='icon' src={TimeAttack} />
                )}

                {data?.status === 2 ? (
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger>Tertolak</TooltipTrigger>
                    <TooltipContent side='bottom' className='dark'>
                      <p>{data.alasan_reject}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : data?.status === 1 ? (
                  'Terverifikasi'
                ) : (
                  'Belum Terverifikasi'
                )}
              </DialogDescription>
            </DialogHeader>

            <div className='py-4 space-y-4 border-b border-b-gray-300 px-8 flex-shrink-0'>
              <div>
                <h1 className='font-bold text-sm'>
                  {data.kelurahan} • {data.kecamatan}
                </h1>
                {data?.kota_kabupaten ? (
                  <p className='font-light text-sm'>
                    Kota {data.kota_kabupaten} • Provinsi {data?.provinsi}
                  </p>
                ) : (
                  <p className='font-light text-sm'>Provinsi {data?.provinsi}</p>
                )}
              </div>
              <div className='rounded-full bg-gradient-to-b from-white to-gray-100 shadow-custom px-4 py-2.5 flex items-center gap-3 w-fit text-sm'>
                <div className='rounded-full bg-gray-900 p-1'>
                  <UserRound className='fill-white stroke-none size-4' />
                </div>
                <div className='font-bold'>{data.data_petugas.nama_petugas}</div>
                <div className='text-gray-300'>|</div>
                <div>Saksi {data.nama_tps}</div>
              </div>
            </div>

            <div className='flex-1 overflow-y-auto'>
              <div className='py-4 px-8 space-y-4'>
                <h1 className='text-base font-bold'>Perolehan Suara</h1>
                <div className='space-y-4'>
                  {data.data_paslon
                    .sort((a, b) => a.no_urut - b.no_urut)
                    .map((item) => (
                      <div key={item.id_paslon} className='grid grid-cols-[24px_40px_1fr_60px] items-center gap-4'>
                        <div className='rounded-full size-6 flex items-center justify-center bg-red-500 text-sm text-white'>
                          {item.no_urut}
                        </div>
                        <img src={item.foto} className='rounded-full size-10 object-cover' />
                        <Progress value={(item.jumlah * 100) / data.sah} className='w-full h-[18px]' />
                        <div className='w-[60px] text-end'>{item.jumlah}</div>
                      </div>
                    ))}
                </div>
              </div>
              <div className='flex justify-between bg-[#E6F4F0] p-6 py-4 font-bold items-center'>
                <h1 className='text-xs'>Total Suara Sah</h1>
                <p className='text-lg'>{data.sah}</p>
              </div>
              <div className='flex justify-between bg-[#FBE6E6] p-6 py-4 font-bold items-center'>
                <h1 className='text-xs'>Total Suara Tidak Sah</h1>
                <p className='text-lg'>{data.tidak_sah}</p>
              </div>
            </div>

            <div className='py-4 px-8 border-t border-t-gray-300 flex justify-between items-center w-full bg-white flex-shrink-0'>
              <div className='items-center flex gap-4'>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant='destructive' className='gap-2' onClick={handleReject}>
                      <X className='size-4' />
                      Tolak
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tolak Data</AlertDialogTitle>
                      <AlertDialogDescription>Apakah Anda yakin ingin menolak data ini ?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <Input
                      placeholder='Tuliskan Alasan Penolakan'
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                    />
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        className={cn(buttonVariants({ variant: 'destructive' }))}
                        onClick={handleReject}
                      >
                        Tolak
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className='gap-2 bg-[#20A86B] hover:bg-[#20A86B]/90' onClick={handleVerify}>
                      <Check className='size-4' />
                      Verifikasi
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Verifikasi Data</AlertDialogTitle>
                      <AlertDialogDescription>Apakah Anda yakin ingin memverfikasi data ini ?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction className={cn('bg-[#20A86B] hover:bg-[#20A86B]/90')} onClick={handleReject}>
                        Verifikasi
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
              <Button
                className='rounded-full size-10 p-0'
                variant='secondary'
                disabled={currentIndex === 0}
                onClick={handlePrev}
              >
                <ChevronLeft />
              </Button>
            </div>
            <div className='absolute top-1/2 right-5 pointer-events-auto'>
              <Button
                type='button'
                className='rounded-full size-10 p-0'
                variant='secondary'
                disabled={currentIndex === unverified.length - 1}
                onClick={handleNext}
              >
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
