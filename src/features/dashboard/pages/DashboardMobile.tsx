import Logo from '@/assets/logo-horizontal.svg'
import SelectPemilu from '@/components/SelectPemilu'
import useSearchParams from '@/hooks/useSearchParams'
import { Box } from 'lucide-react'
import useFetchQuickCount from '../queries/useFetchQuickCount'
import { Card, CardContent } from '@/components/ui/card'
import { useQueryClient } from '@tanstack/react-query'
import { PemiluWithCandidate } from '@/features/pemilu/service/pemilu.service'
import LoadingOverlay from '@/components/LoadingOverlay'

const DashboardMobile = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('pemilu') || ''
  const queryClient = useQueryClient()

  const pemiluList = queryClient.getQueryData<PemiluWithCandidate[]>(['pemilu-list'])
  const pemilu = pemiluList?.find((item) => item._id === id)

  const { data, isLoading } = useFetchQuickCount({ id_pemilu: id })

  return (
    <>
      {(isLoading || !pemilu) && <LoadingOverlay />}
      <header className='flex w-full items-center justify-between px-6 py-3 bg-white'>
        <img alt='logo' src={Logo} className='' />
        <SelectPemilu className='w-1/2' />
      </header>
      <main className='relative min-h-[calc(100dvh-60px)] space-y-4 p-6 bg-white'>
        <section className='space-y-4'>
          <h1 className='text-lg font-bold leading-[28px] tracking-[1%]'>Perolehan Suara</h1>
          <p className='text-sm font-light leading-[21px] tracking-[1%]'>{pemilu?.name}</p>
        </section>

        <section className='space-y-4'>
          {data ? (
            data.data.calon_hasil
              .sort((a, b) => Number(a.no_urut) - Number(b.no_urut))
              .map((item) => (
                <Card key={item.id_paslon} role='button' className='rounded-2xl p-4'>
                  <CardContent className='grid grid-cols-[100px_auto] items-start gap-4 p-0'>
                    <figure className='relative'>
                      <img
                        alt='icon'
                        src={item.foto}
                        className='rounded-lg border-4 aspect-square object-cover'
                        style={{ borderColor: item.warna }}
                      />
                      <div className='bg-red-500 size-6 rounded-md absolute bottom-2 right-2 grid place-content-center text-white'>
                        {item.no_urut}
                      </div>
                    </figure>
                    <div className='space-y-1'>
                      <h1 className='line-clamp-1 text-2xl font-bold leading-[21px] tracking-[1%]'>
                        {Number(item.persentase).toLocaleString('id', { maximumFractionDigits: 2 })}%
                      </h1>

                      <h1 className='line-clamp-1 text-sm font-bold leading-[21px] tracking-[1%]'>
                        {Number(item.jumlah_suara).toLocaleString('id', { maximumFractionDigits: 2 })}
                      </h1>
                      <h1 className='line-clamp-1 text-sm font-normal leading-[21px] tracking-[1%]'>{item.nama}</h1>
                      <h1 className='line-clamp-1 text-sm font-normal leading-[21px] tracking-[1%]'>
                        {item.nama_vice}
                      </h1>
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : (
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4 text-grey-700'>
              <Box className='mx-auto size-16' />
              <h1 className='text-lg font-semibold'>Belum Ada Pemilu</h1>
            </div>
          )}
        </section>

        <section className='space-y-0'>
          <div className='flex items-center justify-between bg-primary-blue-700 text-white p-6 -mx-6'>
            <h1 className='text-xs font-bold'>Suara Masuk</h1>
            <span className='text-lg font-bold'>
              {Number(data?.data.total_suara_masuk).toLocaleString('id', { maximumFractionDigits: 2 })} (
              {Number(data?.data.persentase_suara_masuk).toLocaleString('id', { maximumFractionDigits: 2 })}%)
            </span>
          </div>
          <div className='flex items-center justify-between bg-primary-blue-50 p-6 -mx-6'>
            <h1 className='text-xs font-bold'>Suara Sah</h1>
            <span className='text-lg font-bold'>
              {Number(data?.data.total_suara_sah).toLocaleString('id', { maximumFractionDigits: 2 })} (
              {Number(data?.data.persentase_suara_sah).toLocaleString('id', { maximumFractionDigits: 2 })}%)
            </span>
          </div>
          <div className='flex items-center justify-between bg-error-50 p-6 -mx-6'>
            <h1 className='text-xs font-bold'>Suara Tidak Sah</h1>
            <span className='text-lg font-bold'>
              {Number(data?.data.total_suara_tidak_sah).toLocaleString('id', { maximumFractionDigits: 2 })} (
              {Number(data?.data.persentase_suara_tidak_sah).toLocaleString('id', { maximumFractionDigits: 2 })}%)
            </span>
          </div>
        </section>
      </main>
    </>
  )
}

export default DashboardMobile
