import { useMemo, useState } from "react";
import Dialog from "@mui/material/Dialog";
import MenuSearchAndFilter from "./MenuSearchAndFilter";
import { groupMenuByCategory } from "../../components/utils/groupMenuByCategory";
import useQueryApi from "../../hooks/useQueryApi";
import { getMenu, type GetMenuResponseType } from "./Home.api";
import RestaurantMenuTypeCards, {
  type CategoryCount,
} from "./RestaurantMenuTypeCards";
import RestaurantItemCard from "./RestaurantItemCard";
import DishDetails from "./DishDetails";

function Home() {
  const [search, setSearch] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[] | null>(null);
  const [selectedDish, setSelectedDish] = useState<GetMenuResponseType | null>(null);

  const { data, isLoading } = useQueryApi(getMenu)
    .addQueryParams({ search, category: selectedCategories?.join(",") })
    .addUseQueryOptions({ enabled: !!search || !!selectedCategories })
    .useExecute();

  const groupedMenu = useMemo(() => groupMenuByCategory(data), [data]);

  const categoryCounts: CategoryCount[] = useMemo(
    () =>
      groupedMenu.map(({ category, items }) => ({
        category,
        count: items.length,
      })),
    [groupedMenu],
  );

  const handleSearch = (nextSearch: string, nextFilters: string[]) => {
    setSearch(nextSearch);
    setSelectedCategories(nextFilters);
  };

  return (
    <div className="flex flex-col gap-4 py-4 mx-2 md:mx-36">
      <div className="sticky z-20 top-45 bg-background dark:bg-background-dark">
        <MenuSearchAndFilter onSearch={handleSearch} className="-mt-10" />
        <div className="mt-4">
          {!isLoading && data ? (
            <RestaurantMenuTypeCards categories={categoryCounts} />
          ) : null}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12 text-sm text-gray-400 dark:text-gray-500">
          Loading menu...
        </div>
      ) : groupedMenu.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-sm text-gray-400 dark:text-gray-500">
          No menu items found.
        </div>
      ) : (
        groupedMenu.map(({ category, items }) => (
          <div key={category} className="flex flex-col gap-3">
            <div className="flex h-full items-center gap-4">
              <h2 className="text-lg font-semibold text-black dark:text-white">
                {category}
              </h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <RestaurantItemCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  calorie={item.calorie}
                  price={item.price}
                  onSelect={() => setSelectedDish(item)}
                />
              ))}
            </div>
          </div>
        ))
      )}

      <Dialog
        open={!!selectedDish}
        onClose={() => setSelectedDish(null)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            className: "m-4",
            sx: {
              borderRadius: "1rem",
              overflow: "hidden",
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          },
        }}
      >
        {selectedDish ? (
          <DishDetails
            id={selectedDish.id}
            name={selectedDish.name}
            description={selectedDish.description}
            image={selectedDish.image}
            calorie={selectedDish.calorie}
            price={selectedDish.price}
            onClose={() => setSelectedDish(null)}
          />
        ) : null}
      </Dialog>
    </div>
  );
}

export default Home;
