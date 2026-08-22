import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import useCartStore from '../../store/cartStore'

export type RestaurantItemCardProps = {
  id: number
  name: string
  image: string
  calorie: number
  price: number
}

function RestaurantItemCard({ id, name, image, calorie, price }: RestaurantItemCardProps) {
  const count = useCartStore((state) => state.counts[id] ?? 0)
  const increment = useCartStore((state) => state.increment)
  const decrement = useCartStore((state) => state.decrement)

  const imageSrc = `${image}${image.includes('?') ? '&' : '?'}lock=${id}`

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-3 dark:bg-gray-900">
      <img src={imageSrc} alt={name} className="h-20 w-20 shrink-0 rounded-xl object-cover" />

      <div className="flex min-w-0 grow flex-col gap-1">
        <span className="truncate text-base font-semibold text-black dark:text-white">{name}</span>
        <span className="text-sm text-gray-400 dark:text-gray-500">{calorie} Cal</span>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="text-base font-semibold text-primary">{price} SR</span>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => decrement(id)}
            disabled={count === 0}
            aria-label={`Decrease ${name} quantity`}
            className="flex size-7 items-center justify-center rounded-lg bg-primary/40 text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-40 dark:text-white"
          >
            <RemoveIcon fontSize="small" />
          </button>

          <span className="w-4 text-center text-sm font-medium text-black dark:text-white">{count}</span>

          <button
            type="button"
            onClick={() => increment(id)}
            aria-label={`Increase ${name} quantity`}
            className="flex size-7 items-center justify-center rounded-lg bg-primary/40 text-black dark:text-white"
          >
            <AddIcon fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default RestaurantItemCard
