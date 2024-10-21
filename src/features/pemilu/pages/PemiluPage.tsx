import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { MapPin, PlusCircle } from 'lucide-react'
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
      <div className='flex flex-col gap-4'>
        <Card className='rounded-xl py-8 px-12'>
          <CardContent className='flex gap-16 p-0 items-center justify-between'>
            <div className='space-y-4 w-[40%]'>
              <CardTitle className='text-base lg:text-2xl leading-8 font-black'>
                Pemilihan Walikota dan Wakil Walikota Kota Cimahi Provinsi Jawa Barat Tahun 2024
              </CardTitle>
              <div className='flex items-center gap-2'>
                <MapPin />
                Kota Cimahi, Jawa Barat
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='flex flex-col gap-4 items-center relative'>
                <img
                  src='https://s3-alpha-sig.figma.com/img/a75f/5557/188808cc185497e930c104977af4ebae?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kNwjA6h3yJHdeNJ2ZsSx~lvpboPoxkV-tZTEJYhhSVrHt-FtzR0Slmywio2FgM4THz2GhbRHbs7mdx4HBThX8s3XOPbSDnu9B0uoue7EoaNcvFclQAj9KuYKiB0hZ8V2avk4cfS0xv5hH7qmRtQYr-SovTIe~nXyUFiu0t0ONw881Scy70c9yLx3kDAdnWO8KM49b0aA6y0TskBPMBEtSBdtXHxNCU-HM~rHhFeRAthD~Y-vF9pBDk3wfAXV8AW5y3ETSAmIKBSLcJZhuHlg6qPzH-vIiEE2Dbq-YN52w69OSux9z1qohSDBmwiNVGh3Yi2ace0xeSuqL0GhYBaFPA__'
                  alt='avatar'
                  draggable={false}
                  className='size-20 lg:size-36 aspect-square rounded-full border-4 lg:border-8 border-white drop-shadow-lg'
                />
                <div className='rounded-full size-6 lg:size-10 flex items-center justify-center absolute bottom-0 bg-red-500 text-white'>
                  <h1 className='font-bold text-sm lg:text-2xl'>1</h1>
                </div>
              </div>
              <div className='flex flex-col gap-4 items-center relative'>
                <img
                  src='https://s3-alpha-sig.figma.com/img/a75f/5557/188808cc185497e930c104977af4ebae?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kNwjA6h3yJHdeNJ2ZsSx~lvpboPoxkV-tZTEJYhhSVrHt-FtzR0Slmywio2FgM4THz2GhbRHbs7mdx4HBThX8s3XOPbSDnu9B0uoue7EoaNcvFclQAj9KuYKiB0hZ8V2avk4cfS0xv5hH7qmRtQYr-SovTIe~nXyUFiu0t0ONw881Scy70c9yLx3kDAdnWO8KM49b0aA6y0TskBPMBEtSBdtXHxNCU-HM~rHhFeRAthD~Y-vF9pBDk3wfAXV8AW5y3ETSAmIKBSLcJZhuHlg6qPzH-vIiEE2Dbq-YN52w69OSux9z1qohSDBmwiNVGh3Yi2ace0xeSuqL0GhYBaFPA__'
                  alt='avatar'
                  draggable={false}
                  className='size-20 lg:size-36 aspect-square rounded-full border-4 lg:border-8 border-white drop-shadow-lg'
                />
                <div className='rounded-full size-6 lg:size-10 flex items-center justify-center absolute bottom-0 bg-red-500 text-white'>
                  <h1 className='font-bold text-sm lg:text-2xl'>1</h1>
                </div>
              </div>
              <div className='flex flex-col gap-4 items-center relative'>
                <img
                  src='https://s3-alpha-sig.figma.com/img/a75f/5557/188808cc185497e930c104977af4ebae?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kNwjA6h3yJHdeNJ2ZsSx~lvpboPoxkV-tZTEJYhhSVrHt-FtzR0Slmywio2FgM4THz2GhbRHbs7mdx4HBThX8s3XOPbSDnu9B0uoue7EoaNcvFclQAj9KuYKiB0hZ8V2avk4cfS0xv5hH7qmRtQYr-SovTIe~nXyUFiu0t0ONw881Scy70c9yLx3kDAdnWO8KM49b0aA6y0TskBPMBEtSBdtXHxNCU-HM~rHhFeRAthD~Y-vF9pBDk3wfAXV8AW5y3ETSAmIKBSLcJZhuHlg6qPzH-vIiEE2Dbq-YN52w69OSux9z1qohSDBmwiNVGh3Yi2ace0xeSuqL0GhYBaFPA__'
                  alt='avatar'
                  draggable={false}
                  className='size-20 lg:size-36 aspect-square rounded-full border-4 lg:border-8 border-white drop-shadow-lg'
                />
                <div className='rounded-full size-6 lg:size-10 flex items-center justify-center absolute bottom-0 bg-red-500 text-white'>
                  <h1 className='font-bold text-sm lg:text-2xl'>1</h1>
                </div>
              </div>
              <div className='flex flex-col gap-4 items-center relative'>
                <img
                  src='https://s3-alpha-sig.figma.com/img/a75f/5557/188808cc185497e930c104977af4ebae?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kNwjA6h3yJHdeNJ2ZsSx~lvpboPoxkV-tZTEJYhhSVrHt-FtzR0Slmywio2FgM4THz2GhbRHbs7mdx4HBThX8s3XOPbSDnu9B0uoue7EoaNcvFclQAj9KuYKiB0hZ8V2avk4cfS0xv5hH7qmRtQYr-SovTIe~nXyUFiu0t0ONw881Scy70c9yLx3kDAdnWO8KM49b0aA6y0TskBPMBEtSBdtXHxNCU-HM~rHhFeRAthD~Y-vF9pBDk3wfAXV8AW5y3ETSAmIKBSLcJZhuHlg6qPzH-vIiEE2Dbq-YN52w69OSux9z1qohSDBmwiNVGh3Yi2ace0xeSuqL0GhYBaFPA__'
                  alt='avatar'
                  draggable={false}
                  className='size-20 lg:size-36 aspect-square rounded-full border-4 lg:border-8 border-white drop-shadow-lg'
                />
                <div className='rounded-full size-6 lg:size-10 flex items-center justify-center absolute bottom-0 bg-red-500 text-white'>
                  <h1 className='font-bold text-sm lg:text-2xl'>1</h1>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default PemiluPage
