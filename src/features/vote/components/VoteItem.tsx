import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { PemiluWithCandidate } from '@/features/pemilu/service/pemilu.service'
import useSearchParams from '@/hooks/useSearchParams'
import { cn } from '@/lib/utils'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { Vote } from '../service/vote.service'
import C1Preview from './C1Preview'
import VoteFormDialog from './VoteFormDialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Eye } from 'lucide-react'

type Props = {
  data: Vote
  pemilu: PemiluWithCandidate
}

const VoteItem = ({ data, pemilu }: Props) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  return (
    <>
      <TableRow
        className={cn(
          '[&>*:not(:first-child):not(:last-child)]:border [&>*:not(:first-child):not(:last-child)]:border-b-0 [&>*]:text-center'
        )}
      >
        <TableCell className='font-semibold'>TPS {data.NO}</TableCell>
        {data.data_paslon.length > 0
          ? data.data_paslon.map((item) => <TableCell key={item.id_paslon}>{item.jumlah}</TableCell>)
          : pemilu?.paslon
              .sort((a, b) => Number(a.no_urut) - Number(b.no_urut))
              .map((item) => <TableCell key={item.no_urut}>-</TableCell>)}
        <TableCell>{data.count_dpt}</TableCell>
        <TableCell className={cn({ 'text-destructive': Number(data.sah) > Number(data.count_dpt) })}>
          {Number(data.sah) > Number(data.count_dpt) ? (
            <Tooltip>
              <TooltipTrigger>{data.sah}</TooltipTrigger>
              <TooltipContent>
                <p>Jumlah suara sah lebih banyak dari jumlah DPT</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            data.sah || '-'
          )}
        </TableCell>
        <TableCell>{data.tidak_sah || '-'}</TableCell>
        <TableCell>{data.c1 ? <C1Preview data={data} /> : '-'}</TableCell>
        <TableCell
          className={cn('text-center text-xs', {
            'text-orange-500': data.status === 0,
            'text-green-500': data.status === 1,
            'text-red-500': data.status === 2
          })}
        >
          {data.status === 0 ? (
            'Belum Terverifikasi'
          ) : data.status === 1 ? (
            'Terverifikasi'
          ) : data.status === 2 ? (
            <Tooltip>
              <TooltipTrigger>Ditolak</TooltipTrigger>
              <TooltipContent className='dark'>{data.alasan_reject || '-'}</TooltipContent>
            </Tooltip>
          ) : (
            '-'
          )}
        </TableCell>
        <TableCell className='flex items-center justify-center gap-1'>
          {data.status === 0 ? (
            <Button
              type='button'
              variant='secondary'
              className='p-2 h-fit bg-orange-500 hover:bg-orange-500/90 text-white text-xs'
              onClick={() =>
                navigate({
                  pathname: `/input-vote/${data.id_suara}`,
                  search: createSearchParams(searchParams).toString()
                })
              }
            >
              Verifikasi
            </Button>
          ) : (
            <>
              <VoteFormDialog data={data} pemilu={pemilu} />
              {data.status !== '' && (
                <Button
                  type='button'
                  variant='secondary'
                  className='p-2 h-fit'
                  onClick={() =>
                    navigate({
                      pathname: `/input-vote/${data.id_suara}`,
                      search: createSearchParams(searchParams).toString()
                    })
                  }
                >
                  <Eye className='size-4' />
                </Button>
              )}
            </>
          )}
        </TableCell>
      </TableRow>
    </>
  )
}

export default VoteItem
