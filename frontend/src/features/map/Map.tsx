import { useState } from 'react'
import MenuSearchAndFilter from '../home/MenuSearchAndFilter'
import MapBox from './MapBox'
import useQueryApi from '../../hooks/useQueryApi'
import { getMenu } from '../home/Home.api'

function Map() {
  const [search, setSearch] = useState<string | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[] | null>(null)

  const { data, isLoading } = useQueryApi(getMenu)
    .addQueryParams({ search: search ?? undefined, category: selectedCategories?.join(',') })
    .useExecute()

  const handleSearch = (nextSearch: string, nextFilters: string[]) => {
    setSearch(nextSearch || null)
    setSelectedCategories(nextFilters.length ? nextFilters : null)
  }

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col">
      <div className="sticky z-20 top-45 mx-2 md:mx-36 rounded-4xl">
        <MenuSearchAndFilter onSearch={handleSearch} className="-mt-10" />
      </div>
      <MapBox className="flex-1 -mt-10" items={isLoading ? [] : data ?? []} />
    </div>
  )
}

export default Map
