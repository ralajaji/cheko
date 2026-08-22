import { useEffect, useRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { useNavigate } from 'react-router-dom'
import * as mapboxgl from 'mapbox-gl/esm'
import 'mapbox-gl/dist/mapbox-gl.css';
import RoomIcon from '@mui/icons-material/Room'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import type { GetMenuResponseType } from '../home/Home.api'

const LIGHT_STYLE = 'mapbox://styles/mapbox/streets-v12'
const DARK_STYLE = 'mapbox://styles/mapbox/dark-v11'

type MapBoxProps = {
  className?: string
  items: GetMenuResponseType[]
}

function MapPin({ active }: { active: boolean }) {
  return <RoomIcon className={active ? 'text-primary' : 'text-black dark:text-white'} sx={{ fontSize: 40 }} />
}

function MapMarkerPopup({
  id,
  name,
  image,
  onNavigate,
}: {
  id: number
  name: string
  image: string
  onNavigate: () => void
}) {
  const imageSrc = `${image}${image.includes('?') ? '&' : '?'}lock=${id}`

  return (
    <div className="flex w-72 items-center gap-4 rounded-3xl bg-white p-3 shadow-lg dark:bg-gray-900">
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
        <img src={imageSrc} alt={name} className="h-full w-full object-cover" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch py-1">
        <span className="truncate text-lg font-bold text-black dark:text-white">{name}</span>

        <button
          type="button"
          onClick={onNavigate}
          className="flex items-center justify-between gap-2 border-none outline-none"
        >
          <span className="text-sm text-gray-400 dark:text-gray-500">menu list</span>
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-black">
            <ChevronRightIcon />
          </span>
        </button>
      </div>
    </div>
  )
}

type MarkerEntry = {
  marker: mapboxgl.Marker
  pinRoot: Root
  popupRoot: Root
}

export default function MapBox({ className = '', items }: MapBoxProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const markersRef = useRef<MarkerEntry[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!mapContainerRef.current) return

    const isDark = document.documentElement.classList.contains('dark')

    mapRef.current = new mapboxgl.Map({
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      container: mapContainerRef.current,
      style: isDark ? DARK_STYLE : LIGHT_STYLE,
      center: [46.6753, 24.7136], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: 9 // starting zoom
    });

    const themeObserver = new MutationObserver(() => {
      const nowDark = document.documentElement.classList.contains('dark')
      mapRef.current?.setStyle(nowDark ? DARK_STYLE : LIGHT_STYLE)
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      themeObserver.disconnect()
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const clearMarkers = () => {
      markersRef.current.forEach(({ marker, pinRoot, popupRoot }) => {
        marker.remove()
        queueMicrotask(() => pinRoot.unmount())
        queueMicrotask(() => popupRoot.unmount())
      })
      markersRef.current = []
    }

    clearMarkers()

    items.forEach((item) => {
      const pinEl = document.createElement('div')
      const pinRoot = createRoot(pinEl)
      pinRoot.render(<MapPin active={false} />)

      const popupEl = document.createElement('div')
      const popupRoot = createRoot(popupEl)
      popupRoot.render(
        <MapMarkerPopup id={item.id} name={item.name} image={item.image} onNavigate={() => navigate('/home')} />
      )

      const popup = new mapboxgl.Popup({ offset: 24, closeButton: false, className: 'menu-marker-popup' }).setDOMContent(popupEl)
      popup.on('open', () => pinRoot.render(<MapPin active={true} />))
      popup.on('close', () => pinRoot.render(<MapPin active={false} />))

      const marker = new mapboxgl.Marker({ element: pinEl, anchor: 'bottom' })
        .setLngLat([item.lng, item.lat])
        .setPopup(popup)
        .addTo(map)

      markersRef.current.push({ marker, pinRoot, popupRoot })
    })

    return clearMarkers
  }, [items, navigate])

  return (
    <div
      id='map-container'
      ref={mapContainerRef}
      className={`min-h-100 w-full ${className}`}
    />
  )
}
