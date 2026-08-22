import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import headerBg from '../../assets/header_bg.png'

const tabs = [
  { to: '/home', label: 'Home' },
  { to: '/map', label: 'Map' },
]

function MainLayout() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <div id="app-layout" className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-background dark:bg-background-dark">
        <header className="relative h-40 w-11/12 overflow-hidden rounded-br-[40px]">
          <img
            src={headerBg}
            alt=""
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-md"
          />
          <div className="absolute inset-0 bg-black/80" />

          <nav className="absolute top-0 md:ms-36 flex gap-2">
            {tabs.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded-b-2xl px-5 py-3 text-sm font-medium transition-colors ${
                    isActive ? 'bg-primary text-black' : 'text-white/80'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </header>

        <div className="flex h-40 flex-1 items-center justify-center">
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark((prev) => !prev)} />
        </div>
      </div>

      <main className="flex-1 md:mx-36 mx-2">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout

function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <LightModeIcon className="h-4 w-4 text-black dark:text-gray-400" fontSize="inherit" />

      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle dark mode"
        onClick={onToggle}
        className="flex h-9 w-5 shrink-0 flex-col items-center rounded-full bg-black p-0.5 dark:bg-gray-600"
      >
        <span
          className={`size-3.5 rounded-full bg-primary shadow transition-transform ${
            isDark ? 'translate-y-4' : 'translate-y-0'
          }`}
        />
      </button>

      <DarkModeIcon className="h-4 w-4 text-black dark:text-gray-400" fontSize="inherit" />
    </div>
  )
}
