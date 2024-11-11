import { Skeleton } from '@/components/ui/skeleton'

const VoteStatisticsSkeleton = () => {
  return (
    <div
      role='button'
      className='rounded-xl shadow-custom bg-gray-200 p-4 space-y-4 border-t-[6px] border-gray-400 opacity-70'
      style={{ borderColor: '#B0B0B0' }}
    >
      <Skeleton className='h-4 w-1/4 rounded bg-gray-300' />

      <div className='space-y-2'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className='flex items-center gap-4 text-xs font-medium'>
            <Skeleton className='rounded-full h-6 w-6 bg-gray-400' />

            <div className='flex flex-col flex-1 gap-1 min-w-0'>
              <Skeleton className='h-4 w-3/4 rounded bg-gray-300' />
              <Skeleton className='h-4 w-2/4 rounded bg-gray-300' />
            </div>

            <Skeleton className='h-4 w-12 rounded bg-gray-400 font-bold whitespace-nowrap' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default VoteStatisticsSkeleton
