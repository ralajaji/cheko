import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div id="app-layout">
      <Outlet />
    </div>
  )
}

export default MainLayout
