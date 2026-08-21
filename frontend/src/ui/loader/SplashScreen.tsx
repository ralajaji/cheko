import { useEffect, useState, type ReactNode } from 'react'
import Loader from './Loader'

const SPLASH_DURATION_MS = 3000

interface SplashScreenProps {
  children: ReactNode
}

function SplashScreen({ children }: SplashScreenProps) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), SPLASH_DURATION_MS)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <Loader />
  }

  return children
}

export default SplashScreen
