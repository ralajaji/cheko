import './Loader.css'

const letters = [
  { id: 'r', gradient: 'g1', d: 'M 14 58 V 6 H 33 a 14 14 0 0 1 0 28 H 14 M 31 34 L 51 58' },
  { id: 'a1', gradient: 'g2', d: 'M 8 58 L 32 6 L 56 58 M 17 41 H 47' },
  { id: 'y1', gradient: 'g3', d: 'M 10 6 L 32 33 L 54 6 M 32 33 V 58' },
  { id: 'y2', gradient: 'g4', d: 'M 10 6 L 32 33 L 54 6 M 32 33 V 58' },
  { id: 'a2', gradient: 'g5', d: 'M 8 58 L 32 6 L 56 58 M 17 41 H 47' },
  { id: 'n', gradient: 'g6', d: 'M 13 58 V 6 L 51 58 V 6' },
] as const

const gradients: Record<string, [string, string]> = {
  g1: ['#973BED', '#007CFF'],
  g2: ['#FFC800', '#FF00FF'],
  g3: ['#00E0ED', '#00DA72'],
  g4: ['#F97316', '#EF4444'],
  g5: ['#06B6D4', '#8B5CF6'],
  g6: ['#A3E635', '#0EA5E9'],
}

interface LoaderProps {
  fullScreen?: boolean
  className?: string
}

function Loader({ fullScreen = true, className = '' }: LoaderProps) {
  return (
    <div
      className={`${
        fullScreen ? 'fixed inset-0' : 'h-full'
      } grid place-items-center bg-background dark:bg-background-dark ${className}`}
    >
      <div className="loader">
        <svg height="0" width="0" viewBox="0 0 64 64" className="absolute">
          <defs>
            {Object.entries(gradients).map(([id, [from, to]]) => (
              <linearGradient
                key={id}
                id={id}
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="62"
                x2="0"
                y2="2"
              >
                <stop stopColor={from} />
                <stop stopColor={to} offset="1" />
              </linearGradient>
            ))}
          </defs>
        </svg>

        {letters.map(({ id, gradient, d }, i) => (
          <svg
            key={id}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 64 64"
            height="64"
            width="64"
            className="inline-block letter"
          >
            <path
              id={id}
              d={d}
              stroke={`url(#${gradient})`}
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={360}
              className="dash"
              style={{ '--i': i } as React.CSSProperties}
            />
          </svg>
        ))}
      </div>
    </div>
  )
}

export default Loader
