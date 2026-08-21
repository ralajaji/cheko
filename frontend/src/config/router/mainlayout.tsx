import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
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
      <div className="flex items-center justify-between">
        <header className="relative h-40 w-11/12 overflow-hidden rounded-br-[40px]">
          <img
            src={headerBg}
            alt=""
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-md"
          />
          <div className="absolute inset-0 bg-black/80" />

          <nav className="absolute top-0 left-45 flex gap-2">
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

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout

function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4 text-black dark:text-gray-400"
      >
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
      </svg>

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

      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4 text-black dark:text-gray-400"
      >
        <path
          fillRule="evenodd"
          d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}
