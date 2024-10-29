import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { PemiluWithCandidate } from '@/features/pemilu/service/pemilu.service'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { Vote } from '../service/vote.service'
import C1Preview from './C1Preview'
import VoteFormDialog from './VoteFormDialog'

type Props = {
  data: Vote
  pemilu: PemiluWithCandidate
}

const VoteItem = ({ data, pemilu }: Props) => {
  const navigate = useNavigate()

  return (
    <>
      <TableRow
        className={cn(
          '[&>*:not(:first-child):not(:last-child)]:border [&>*:not(:first-child):not(:last-child)]:border-b-0'
        )}
      >
        <TableCell className='text-center font-semibold'>TPS {data.NO}</TableCell>
        {data.data_paslon.length > 0
          ? data.data_paslon.map((item) => (
              <TableCell key={item.id_paslon} className='text-center'>
                {item.jumlah}
              </TableCell>
            ))
          : pemilu?.paslon
              .sort((a, b) => Number(a.no_urut) - Number(b.no_urut))
              .map((item) => (
                <TableCell key={item.no_urut} className='text-center'>
                  -
                </TableCell>
              ))}
        <TableCell className='text-center'>{data.count_dpt}</TableCell>
        <TableCell className='text-center'>{data.sah || '-'}</TableCell>
        <TableCell className='text-center'>{data.tidak_sah || '-'}</TableCell>
        <TableCell className='text-center'>
          <C1Preview data={data} />
        </TableCell>
        <TableCell
          className={cn('text-center text-xs', {
            'text-orange-500': data.status === 0,
            'text-green-500': data.status === 1,
            'text-red-500': data.status === 2
          })}
        >
          {data.status === 0
            ? 'Belum Terverifikasi'
            : data.status === 1
            ? 'Terverifikasi'
            : data.status === 2
            ? 'Tertolak'
            : '-'}
        </TableCell>
        <TableCell className='flex items-center justify-center gap-1'>
          {data.status === 0 ? (
            <Button
              type='button'
              variant='secondary'
              className='p-2 h-fit bg-orange-500 hover:bg-orange-500/90 text-white text-xs'
              onClick={() => navigate(`/input-vote/${data.id_suara}`)}
            >
              Verifikasi
            </Button>
          ) : (
            <VoteFormDialog data={data} pemilu={pemilu} />
          )}
        </TableCell>
      </TableRow>
    </>
  )
}

export default VoteItem
