import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import SummaryTPSList from './SummaryTPSList'

type Props = {
  icon: string
  count: number
  label: string
  className: string
  status: 0 | 2 | 1 | null
}

const SummaryCard = ({ icon, count, label, className, status }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card role='button' className={cn('p-6 rounded-3xl border-0 border-b-4', className)}>
          <CardContent className='p-0 flex flex-col items-center gap-3'>
            <img alt='icon' src={icon} />
            <h1 className='font-bold text-2xl'>{count}</h1>
            <p className='text-sm'>{label}</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>TPS {label}</DialogTitle>
          <DialogDescription className='sr-only'>Daftar TPS {label}</DialogDescription>
        </DialogHeader>

        <SummaryTPSList status={status} />
      </DialogContent>
    </Dialog>
  )
}

export default SummaryCard
