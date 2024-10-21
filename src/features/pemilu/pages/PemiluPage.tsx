import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import PemiluListCard from '../components/PemiluListCard'

const PemiluPage = () => {
  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h1 className='font-semibold text-lg'>Daftar Pemilu</h1>
        <Link to='/pemilu/form'>
          <Button className='gap-2'>
            <PlusCircle className='size-4' />
            Tambah
          </Button>
        </Link>
      </div>
      <div className='flex flex-col gap-4'>
        <PemiluListCard />
        <PemiluListCard />
        <PemiluListCard />
      </div>
    </section>
  )
}

export default PemiluPage
