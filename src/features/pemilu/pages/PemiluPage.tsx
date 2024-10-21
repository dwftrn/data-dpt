import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PlusCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

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
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        <Card className='p-6 rounded-xl'>
          <CardContent className='p-0'></CardContent>
        </Card>
      </div>
    </section>
  )
}

export default PemiluPage
