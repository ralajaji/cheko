import { lazy, Suspense } from 'react'
import { Loader } from '../../ui/loader'

const Map = lazy(() => import('../../features/map/Map'))

function MapPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Map />
    </Suspense>
  )
}

export default MapPage
