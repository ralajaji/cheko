import { lazy, Suspense } from 'react'
import { Loader } from '../../ui/loader'

const Home = lazy(() => import('../../features/home/Home'))

function HomePage() {
  return (
    <Suspense fallback={<Loader />}>
      <Home />
    </Suspense>
  )
}

export default HomePage
