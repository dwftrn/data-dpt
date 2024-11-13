import { useEffect } from 'react'
import useQuickCountQueries from '../queries/useQuickCountQueries'
import CimahiMap from './CimahiMap'

const MapContainer = () => {
  const { data: districtsData, isLoading } = useQuickCountQueries()

  useEffect(() => {
    districtsData.map((item) => {
      const higher = item.votes[0]
      const color = higher.persentase > 0 ? higher.warna : '#E6E6E6'
      document
        .querySelector(`#map-${item.name.replace(' ', '-').toLowerCase()}`)
        ?.setAttribute('style', `fill: ${color}`)
    })
  }, [districtsData])

  return (
    <>
      <h1 className='font-semibold text-lg'>Peta Perolehan Suara</h1>
      <div data-loading={isLoading} className='w-full grid place-content-center group'>
        <CimahiMap />
      </div>
    </>
  )
}

export default MapContainer
