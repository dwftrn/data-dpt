import useSearchParams from '@/hooks/useSearchParams'
import { cn } from '@/lib/utils'
import { QuickCountCard, REGION_CODE } from '../services/dashboard.service'

const VoteStatisticsCard = ({ data, region }: { data: QuickCountCard; region: REGION_CODE }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams()
  const color = data.votes
    .sort((a, b) => b.jumlah_suara - a.jumlah_suara)
    .slice(0, 1)
    .at(0)?.warna
  const isAll0Percent = data.votes.every((item) => item.jumlah_suara === 0)

  const handleClick = () => {
    // Create an object with the new params and nullify dependent fields
    const newParams = (() => {
      if (region === REGION_CODE.ALL) {
        return {
          province: data.id_region,
          city: '0',
          district: '0',
          subdistrict: '0'
        }
      } else if (region === REGION_CODE.PROVINCE) {
        return {
          city: data.id_region,
          district: '0',
          subdistrict: '0'
        }
      } else if (region === REGION_CODE.CITY) {
        return {
          district: data.id_region,
          subdistrict: '0'
        }
      } else if (region === REGION_CODE.DISTRICT) {
        return {
          subdistrict: data.id_region
        }
      }
      return {}
    })()

    setSearchParams(newParams as Record<string, string>)
  }

  return (
    <div
      role='button'
      className={cn('rounded-xl shadow-custom bg-white p-4 space-y-4 border-t-[6px] border-mauve', {
        'opacity-50': isAll0Percent
      })}
      style={{ borderColor: isAll0Percent ? '#E0E0E0' : color }}
      onClick={handleClick}
    >
      <h1 className='text-sm font-semibold'>{data.name}</h1>
      {data.rt_rw && (
        <div className='flex items-center gap-2 h-10 bg-grey-50 -mx-4 px-4 !mt-0.5'>
          <h1 className='text-xs font-bold shrink-0'>RT/RW</h1>
          <div
            className='flex-1 overflow-x-auto
            [&::-webkit-scrollbar]:hidden 
            [-ms-overflow-style]:none 
            [scrollbar-width]:none 
            flex items-center gap-1.5'
          >
            {data.rt_rw.map((item) => (
              <div
                key={item}
                className='text-[10px] font-normal bg-white py-1.5 px-2 rounded-md border border-grey-500'
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className='space-y-2'>
        {data.votes
          .sort((a, b) => +a.no_urut - +b.no_urut)
          .map((item) => (
            <div key={item.id_paslon} className='flex items-center gap-4 text-xs font-medium'>
              <div className='rounded-full bg-coral-pink size-6 flex items-center justify-center text-white aspect-square bg-red-500'>
                {item.no_urut}
              </div>
              <div className='flex flex-col flex-1 gap-1 min-w-0'>
                <span className='truncate block w-full overflow-hidden'>{item.name}</span>
                <span className='truncate block w-full overflow-hidden'>{item.vice_name}</span>
              </div>
              <div className='flex flex-col flex-1 text-end gap-1 min-w-0'>
                <span className='font-bold whitespace-nowrap'>
                  {Number(item.persentase).toLocaleString('id', { maximumFractionDigits: 2 })}%
                </span>
                <span className='font-light whitespace-nowrap'>
                  {Number(item.jumlah_suara).toLocaleString('id', { maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default VoteStatisticsCard
