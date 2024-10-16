import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

const kontl = [
  {
    picture:
      'https://s3-alpha-sig.figma.com/img/a75f/5557/188808cc185497e930c104977af4ebae?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kNwjA6h3yJHdeNJ2ZsSx~lvpboPoxkV-tZTEJYhhSVrHt-FtzR0Slmywio2FgM4THz2GhbRHbs7mdx4HBThX8s3XOPbSDnu9B0uoue7EoaNcvFclQAj9KuYKiB0hZ8V2avk4cfS0xv5hH7qmRtQYr-SovTIe~nXyUFiu0t0ONw881Scy70c9yLx3kDAdnWO8KM49b0aA6y0TskBPMBEtSBdtXHxNCU-HM~rHhFeRAthD~Y-vF9pBDk3wfAXV8AW5y3ETSAmIKBSLcJZhuHlg6qPzH-vIiEE2Dbq-YN52w69OSux9z1qohSDBmwiNVGh3Yi2ace0xeSuqL0GhYBaFPA__',
    name: 'Anies Baswedan',
    name2: 'Muhaimin Iskandar',
    percentage: '45,30%',
    total: '69.421.770'
  },
  {
    picture:
      'https://s3-alpha-sig.figma.com/img/a75f/5557/188808cc185497e930c104977af4ebae?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kNwjA6h3yJHdeNJ2ZsSx~lvpboPoxkV-tZTEJYhhSVrHt-FtzR0Slmywio2FgM4THz2GhbRHbs7mdx4HBThX8s3XOPbSDnu9B0uoue7EoaNcvFclQAj9KuYKiB0hZ8V2avk4cfS0xv5hH7qmRtQYr-SovTIe~nXyUFiu0t0ONw881Scy70c9yLx3kDAdnWO8KM49b0aA6y0TskBPMBEtSBdtXHxNCU-HM~rHhFeRAthD~Y-vF9pBDk3wfAXV8AW5y3ETSAmIKBSLcJZhuHlg6qPzH-vIiEE2Dbq-YN52w69OSux9z1qohSDBmwiNVGh3Yi2ace0xeSuqL0GhYBaFPA__',
    name: 'Anies Baswedan',
    name2: 'Muhaimin Iskandar',
    percentage: '45,30%',
    total: '69.421.770'
  },
  {
    picture:
      'https://s3-alpha-sig.figma.com/img/a75f/5557/188808cc185497e930c104977af4ebae?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kNwjA6h3yJHdeNJ2ZsSx~lvpboPoxkV-tZTEJYhhSVrHt-FtzR0Slmywio2FgM4THz2GhbRHbs7mdx4HBThX8s3XOPbSDnu9B0uoue7EoaNcvFclQAj9KuYKiB0hZ8V2avk4cfS0xv5hH7qmRtQYr-SovTIe~nXyUFiu0t0ONw881Scy70c9yLx3kDAdnWO8KM49b0aA6y0TskBPMBEtSBdtXHxNCU-HM~rHhFeRAthD~Y-vF9pBDk3wfAXV8AW5y3ETSAmIKBSLcJZhuHlg6qPzH-vIiEE2Dbq-YN52w69OSux9z1qohSDBmwiNVGh3Yi2ace0xeSuqL0GhYBaFPA__',
    name: 'Anies Baswedan',
    name2: 'Muhaimin Iskandar',
    percentage: '45,30%',
    total: '69.421.770'
  },
  {
    picture:
      'https://s3-alpha-sig.figma.com/img/a75f/5557/188808cc185497e930c104977af4ebae?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kNwjA6h3yJHdeNJ2ZsSx~lvpboPoxkV-tZTEJYhhSVrHt-FtzR0Slmywio2FgM4THz2GhbRHbs7mdx4HBThX8s3XOPbSDnu9B0uoue7EoaNcvFclQAj9KuYKiB0hZ8V2avk4cfS0xv5hH7qmRtQYr-SovTIe~nXyUFiu0t0ONw881Scy70c9yLx3kDAdnWO8KM49b0aA6y0TskBPMBEtSBdtXHxNCU-HM~rHhFeRAthD~Y-vF9pBDk3wfAXV8AW5y3ETSAmIKBSLcJZhuHlg6qPzH-vIiEE2Dbq-YN52w69OSux9z1qohSDBmwiNVGh3Yi2ace0xeSuqL0GhYBaFPA__',
    name: 'Anies Baswedan',
    name2: 'Muhaimin Iskandar',
    percentage: '45,30%',
    total: '69.421.770'
  }
]

const DashboardPage = () => {
  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h1 className='font-semibold text-lg'>Quick Count Pemilihan Walikota Cimahi</h1>
        <Select>
          <SelectTrigger className='capitalize w-1/4'>
            <SelectValue placeholder='Pilih Pemilu' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='0'>Semua</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Card className='rounded-t-xl rounded-b-none p-6'>
          <CardContent className='p-0 flex justify-evenly gap-4'>
            {kontl.map(() => (
              <div className={cn('flex items-center gap-4 justify-center', { 'flex-col': kontl.length > 3 })}>
                <img
                  alt='paslon'
                  src='https://s3-alpha-sig.figma.com/img/a75f/5557/188808cc185497e930c104977af4ebae?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kNwjA6h3yJHdeNJ2ZsSx~lvpboPoxkV-tZTEJYhhSVrHt-FtzR0Slmywio2FgM4THz2GhbRHbs7mdx4HBThX8s3XOPbSDnu9B0uoue7EoaNcvFclQAj9KuYKiB0hZ8V2avk4cfS0xv5hH7qmRtQYr-SovTIe~nXyUFiu0t0ONw881Scy70c9yLx3kDAdnWO8KM49b0aA6y0TskBPMBEtSBdtXHxNCU-HM~rHhFeRAthD~Y-vF9pBDk3wfAXV8AW5y3ETSAmIKBSLcJZhuHlg6qPzH-vIiEE2Dbq-YN52w69OSux9z1qohSDBmwiNVGh3Yi2ace0xeSuqL0GhYBaFPA__'
                  className='rounded-xl max-w-[110px] aspect-square object-cover border-[3px] border-blue-400'
                />
                <div className={cn('space-y-1', { 'text-center': kontl.length > 3 })}>
                  <div>
                    <h1 className='font-bold text-3xl text-blue-400'>45,30%</h1>
                    <p className='text-blue-400'>69.421.770</p>
                  </div>
                  <div className='text-sm font-medium'>
                    <h3>Anies Baswedan</h3>
                    <h3>Muhaimin Iskandar</h3>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <div className='h-10 rounded-b-xl grid grid-cols-2'>
          <div className='bg-green-600 rounded-bl-xl flex items-center justify-between px-8 py-4'>
            <span>Suara Sah Masuk</span>
            <span>200.000.000</span>
          </div>
          <div className='bg-pink-300 rounded-br-xl flex items-center justify-between px-8 py-4'>
            <span>Suara Tidak Masuk</span>
            <span>200.000.000</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
