import { useEffect } from 'react'
import useQuickCountQueries from '../queries/useQuickCountQueries'
import CimahiMap from './CimahiMap'

const MapContainer = () => {
  const { data: districtsData, isLoading } = useQuickCountQueries()

  useEffect(() => {
    districtsData.map((item) => {
      document
        .querySelector(`#map-${item.name.replace(' ', '-').toLowerCase()}`)
        ?.setAttribute('style', `fill: ${item.votes[0].warna}`)
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
