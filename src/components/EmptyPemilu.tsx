import { Box } from 'lucide-react'

const EmptyPemilu = () => {
  return (
    <div className='w-full h-[calc(100dvh-104px)] lg:h-[calc(100dvh-108px)] grid place-content-center min-h-[50vh] gap-8 text-grey-700'>
      <Box className='mx-auto size-24' />
      <h1 className='font-semibold text-lg'>Belum ada data pemilu.</h1>
    </div>
  )
}

export default EmptyPemilu
