import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from './mainlayout'
import HomePage from '../../pages/home/HomePage'
import MapPage from '../../pages/map/MapPage'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', element: <HomePage /> },
      { path: 'map', element: <MapPage /> },
    ],
  },
])

export default router
