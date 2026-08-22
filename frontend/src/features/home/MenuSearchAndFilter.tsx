import { useEffect, useMemo, useState } from "react";
import SearchAndFilter from "../../components/UI/SearchAndFilter";
import { groupMenuByCategory } from "../../components/utils/groupMenuByCategory";
import useQueryApi from "../../hooks/useQueryApi";
import { useDebounce } from "../../hooks/useDebounce";
import { getMenu } from "./Home.api";

type MenuSearchAndFilterProps = {
  onSearch: (search: string, filters: string[]) => void;
  className?: string;
};

function MenuSearchAndFilter({ onSearch, className }: MenuSearchAndFilterProps) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const debouncedSearch = useDebounce(search, 400);

  const { data } = useQueryApi(getMenu).useExecute();

  const filterOptions = useMemo(
    () => groupMenuByCategory(data).map(({ category }) => category),
    [data],
  );

  useEffect(() => {
    onSearch(debouncedSearch, filters);
  }, [debouncedSearch]);

  const handleFiltersChange = (next: string[]) => {
    setFilters(next);
    onSearch(search, next);
  };

  const handleSubmit = () => {
    onSearch(search, filters);
  };

  return (
    <SearchAndFilter
      search={search}
      filters={filters}
      filterOptions={filterOptions}
      onSearchChange={setSearch}
      onFiltersChange={handleFiltersChange}
      onSubmit={handleSubmit}
      className={className}
    />
  );
}

export default MenuSearchAndFilter;
