import { cn } from '@/lib/utils'

const CandidateCardItem = ({ totalData }: { totalData: number }) => {
  return (
    <div className={cn('flex items-center gap-4 justify-center', { 'flex-col': totalData > 3 })}>
      <div className='relative'>
        <img
          alt='paslon'
          src='https://s3-alpha-sig.figma.com/img/a75f/5557/188808cc185497e930c104977af4ebae?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kNwjA6h3yJHdeNJ2ZsSx~lvpboPoxkV-tZTEJYhhSVrHt-FtzR0Slmywio2FgM4THz2GhbRHbs7mdx4HBThX8s3XOPbSDnu9B0uoue7EoaNcvFclQAj9KuYKiB0hZ8V2avk4cfS0xv5hH7qmRtQYr-SovTIe~nXyUFiu0t0ONw881Scy70c9yLx3kDAdnWO8KM49b0aA6y0TskBPMBEtSBdtXHxNCU-HM~rHhFeRAthD~Y-vF9pBDk3wfAXV8AW5y3ETSAmIKBSLcJZhuHlg6qPzH-vIiEE2Dbq-YN52w69OSux9z1qohSDBmwiNVGh3Yi2ace0xeSuqL0GhYBaFPA__'
          draggable={false}
          className='rounded-xl aspect-square object-cover border-[3px] border-blue-400'
        />
        <div className='absolute bottom-2 right-2 bg-blue-400 text-white size-5 rounded text-xs flex items-center justify-center'>
          1
        </div>
      </div>
      <div className={cn('space-y-1', { 'text-center': totalData > 3 })}>
        <div>
          <h1 className='font-bold text-3xl text-blue-400'>45,30%</h1>
          <p className='text-blue-400'>69.421.770</p>
        </div>
        <div className='text-sm font-medium'>
          <h3>Ngatiyana</h3>
          <h3>Adhitia Yudisthira</h3>
        </div>
      </div>
    </div>
  )
}

export default CandidateCardItem
