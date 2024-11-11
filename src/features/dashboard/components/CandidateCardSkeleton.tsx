import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const CandidateCardSkeleton = () => {
  return (
    <div>
      <Card className='rounded-t-xl rounded-b-none p-6 border-b-0'>
        <CardContent className='p-0 flex justify-evenly gap-4'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='flex items-center gap-4 justify-center'>
              {/* Skeleton for Candidate Image */}
              <div className='relative'>
                <Skeleton className='rounded-xl h-[110px] w-[110px] bg-gray-300' />
                <Skeleton className='absolute bottom-2 right-2 h-6 w-6 rounded-full bg-gray-500' />
              </div>
              <div className='space-y-1 text-center'>
                {/* Skeleton for Percentage and Votes */}
                <Skeleton className='h-8 w-16 bg-gray-300' />
                <Skeleton className='h-6 w-24 bg-gray-300' />
                {/* Skeleton for Names */}
                <Skeleton className='h-4 w-24 bg-gray-300' />
                <Skeleton className='h-4 w-24 bg-gray-300' />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skeleton for Statistics Section */}
      <div className='grid grid-cols-3 rounded-b-xl border border-t-0 font-semibold h-14 text-xs'>
        <div className='bg-primary-blue-700 flex items-center justify-between rounded-bl-xl text-white px-8 py-4 w-full h-full gap-3'>
          <Skeleton className='h-4 w-20 bg-gray-300' />
          <Skeleton className='h-4 w-40 bg-gray-300' />
        </div>
        <div className='bg-light-green flex items-center justify-between px-8 py-4 h-full w-full gap-3'>
          <Skeleton className='h-4 w-20 bg-gray-300' />
          <Skeleton className='h-4 w-40 bg-gray-300' />
        </div>
        <div className='bg-error-50 flex items-center justify-between px-8 py-4 h-full rounded-br-xl w-full gap-3'>
          <Skeleton className='h-4 w-20 bg-gray-300' />
          <Skeleton className='h-4 w-40 bg-gray-300' />
        </div>
      </div>
    </div>
  )
}

export default CandidateCardSkeleton
