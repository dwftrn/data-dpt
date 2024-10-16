const VoteStatisticsCard = () => {
  return (
    <div className='rounded-xl shadow-custom bg-white p-4 space-y-4 border-t-4 border-mauve'>
      <h1 className='text-sm font-semibold'>Cibeureum</h1>
      <div className='space-y-2'>
        <div className='flex items-center gap-4 text-xs font-medium'>
          <div className='rounded-full bg-coral-pink size-3'></div>
          <div className='flex flex-col flex-1 gap-1'>
            <span>Ngatiyana</span>
            <span>Adhitia Yudisthira</span>
          </div>
          <span className='font-bold'>45,30%</span>
        </div>
        <div className='flex items-center gap-4 text-xs font-medium'>
          <div className='rounded-full bg-coral-pink size-3'></div>
          <div className='flex flex-col flex-1 gap-1'>
            <span>Ngatiyana</span>
            <span>Adhitia Yudisthira</span>
          </div>
          <span className='font-bold'>45,30%</span>
        </div>
        <div className='flex items-center gap-4 text-xs font-medium'>
          <div className='rounded-full bg-coral-pink size-3'></div>
          <div className='flex flex-col flex-1 gap-1'>
            <span>Ngatiyana</span>
            <span>Adhitia Yudisthira</span>
          </div>
          <span className='font-bold'>45,30%</span>
        </div>
      </div>
    </div>
  )
}

export default VoteStatisticsCard
