import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import router from './config/router/router'
import { SplashScreen } from './ui/loader'

const queryClient = new QueryClient()

function App() {
  return (
    <SplashScreen>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SplashScreen>
  )
}

export default App
