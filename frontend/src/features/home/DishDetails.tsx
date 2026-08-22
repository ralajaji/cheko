import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import useCartStore from '../../store/cartStore'

export type DishDetailsProps = {
  id: number
  name: string
  description: string
  image: string
  calorie: number
  price: number
  onClose: () => void
}

function DishDetails({ id, name, description, image, calorie, price, onClose }: DishDetailsProps) {
  const count = useCartStore((state) => state.counts[id] ?? 0)
  const increment = useCartStore((state) => state.increment)
  const decrement = useCartStore((state) => state.decrement)

  const imageSrc = `${image}${image.includes('?') ? '&' : '?'}lock=${id}`

  return (
    <div className="relative flex flex-col gap-3 rounded-2xl bg-white p-4 dark:bg-gray-900">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-gray-300 text-white dark:bg-gray-700"
      >
        <CloseIcon fontSize="small" />
      </button>

      <span className="pr-10 text-lg font-semibold text-black dark:text-white">{name}</span>
      <span className="text-sm text-gray-400 dark:text-gray-500">{calorie} Cal</span>
      <span className="text-sm text-gray-500 dark:text-gray-400">{description}</span>

      <img src={imageSrc} alt={name} className="w-full rounded-2xl object-cover" />

      <div className="flex items-center justify-end gap-4">
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

export default DishDetails
