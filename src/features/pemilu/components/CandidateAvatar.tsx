import { PemiluCandidate } from '../service/pemilu.service'

const CandidateAvatar = ({ candidate }: { candidate: PemiluCandidate }) => {
  return (
    <div className='flex flex-col gap-4 items-center relative'>
      <img
        src={candidate.foto}
        alt='avatar'
        draggable={false}
        className='size-20 lg:size-32 aspect-square rounded-full border-4 lg:border-8 border-white drop-shadow-lg'
      />
      <div className='rounded-full size-6 lg:size-10 flex items-center justify-center absolute bottom-0 bg-red-500 text-white'>
        <h1 className='font-bold text-sm lg:text-2xl'>{candidate.no_urut}</h1>
      </div>
    </div>
  )
}

export default CandidateAvatar
