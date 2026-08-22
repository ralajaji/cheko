import MenuSearchAndFilter from '../home/MenuSearchAndFilter'

function Map() {
  const handleSearch = (search: string, filters: string[]) => {
    console.log('Map search:', search, filters)
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <MenuSearchAndFilter onSearch={handleSearch} />
    </div>
  )
}

export default Map
