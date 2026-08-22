import soupsIcon from '../../assets/soups.svg'
import ordersIcon from '../../assets/orders.svg'
import drinksIcon from '../../assets/drinks.svg'
import breakfastIcon from '../../assets/breakfast.svg'
import sushiIcon from '../../assets/sushi.svg'

function getCategoryIcon(category: string) {
  switch (category.toLowerCase()) {
    case 'soups':
      return soupsIcon
    case 'orders':
      return ordersIcon
    case 'drinks':
      return drinksIcon
    case 'breakfast':
      return breakfastIcon
    case 'sushi':
      return sushiIcon
    default:
      return undefined
  }
}

const cozyColors = ['#F4B183', '#9DC3B8', '#F2C879', '#D9A5B3', '#C9ADA7']

export type CategoryCount = {
  category: string
  count: number
}

type RestaurantMenuTypeCardsProps = {
  categories: CategoryCount[]
}

function RestaurantMenuTypeCards({ categories }: RestaurantMenuTypeCardsProps) {
  return (
    <div className="flex w-full gap-2 overflow-x-auto pb-1">
      {categories.map(({ category, count }, index) => {
        const icon = getCategoryIcon(category)
        return (
          <div
            key={category}
            className="flex flex-1 items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm dark:bg-gray-900"
          >
            <div
              className={`flex size-12 shrink-0 items-center justify-center rounded-xl`}
              style={{ backgroundColor: cozyColors[index % cozyColors.length] }}
            >
              {icon && <img src={icon} alt={category} className="h-5 w-5" />}
            </div>
            <div className="flex flex-1 items-center justify-between gap-3">
              <span className="whitespace-nowrap text-base font-medium text-black dark:text-white">
                {category}
              </span>
              <span className="text-lg font-semibold text-black dark:text-white">{count}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RestaurantMenuTypeCards
