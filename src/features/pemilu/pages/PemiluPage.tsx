import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import PemiluListCard from '../components/PemiluListCard'
import useFetchPemilu from '../queries/useFetchPemilu'
import LoadingOverlay from '@/components/LoadingOverlay'
import EmptyPemilu from '@/components/EmptyPemilu'

const PemiluPage = () => {
  const { data, isLoading } = useFetchPemilu()

  return (
    <section className='flex flex-col gap-4'>
      {isLoading && <LoadingOverlay />}
      <div className='flex items-center justify-between h-14 lg:h-[60px] -mt-4 md:-mt-6 2xl:-mt-8'>
        <h1 className='font-semibold text-lg'>Daftar Pemilu</h1>
        <Link to='/pemilu/form'>
          <Button className='gap-2'>
            <PlusCircle className='size-4' />
            Tambah
          </Button>
        </Link>
      </div>
      <div className='flex flex-col gap-4'>
        {!data || data?.length > 0 ? (
          data?.map((item) => <PemiluListCard key={item._id} pemilu={item} />)
        ) : (
          <EmptyPemilu />
        )}
      </div>
    </section>
  )
}

export default PemiluPage
