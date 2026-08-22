import type { KeyboardEvent } from "react";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

export type SearchAndFilterProps = {
  search: string;
  filters: string[];
  filterOptions: string[];
  onSearchChange: (value: string) => void;
  onFiltersChange: (values: string[]) => void;
  onSubmit: () => void;
  className?: string;
};

function SearchAndFilter({
  search,
  filters,
  filterOptions,
  onSearchChange,
  onFiltersChange,
  onSubmit,
  className = "",
}: SearchAndFilterProps) {
  const handleFilterChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    const next = typeof value === "string" ? value.split(",") : value;
    onFiltersChange(next);
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") onSubmit();
  };

  return (
    <div
      className={`flex w-full items-center gap-3 rounded-2xl bg-white py-2 pl-5 pr-2 shadow-sm dark:bg-gray-900 ${className}`}
    >
      <SearchIcon className="shrink-0 text-gray-400" fontSize="small" />
      <input
        type="text"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        onKeyDown={handleSearchKeyDown}
        placeholder="Search"
        className="h-10 min-w-0 grow basis-0 bg-transparent text-sm text-black placeholder:text-gray-400 focus:outline-none dark:text-white dark:placeholder:text-gray-500"
      />

      <div className="h-6 w-px shrink-0 bg-gray-200 dark:bg-gray-700" />

      <TuneIcon className="shrink-0 text-gray-400" fontSize="small" />
      <Select<string[]>
        multiple
        value={filters}
        onChange={handleFilterChange}
        displayEmpty
        variant="standard"
        disableUnderline
        renderValue={(selected) =>
          selected.length ? (
            selected.join(", ")
          ) : (
            <span className="text-gray-400">Filter</span>
          )
        }
        className="min-w-0 grow-2 basis-0 text-sm text-black dark:text-white"
        sx={{
          fontSize: 14,
          color: "inherit",
          "& .MuiSelect-select": { paddingTop: 0, paddingBottom: 0 },
          "& .MuiSelect-icon": { color: "inherit" },
        }}
        MenuProps={{
          disableScrollLock: true,
          slotProps: {
            paper: {
              sx: {
                ".dark &": { backgroundColor: "#111827", color: "#fff" },
              },
            },
          },
        }}
      >
        {filterOptions.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              ".dark &": { color: "#fff" },
              ".dark &:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
              ".dark &.Mui-selected": {
                backgroundColor: "rgba(255,255,255,0.12)",
              },
              ".dark &.Mui-selected:hover": {
                backgroundColor: "rgba(255,255,255,0.16)",
              },
            }}
          >
            <Checkbox
              checked={filters.includes(option)}
              size="small"
              sx={{
                ".dark &:not(.Mui-checked)": { color: "rgba(255,255,255,0.7)" },
              }}
            />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>

      <button
        type="button"
        onClick={onSubmit}
        className="h-10 shrink-0 rounded-xl bg-primary px-8 text-sm font-semibold text-black transition-opacity hover:opacity-90"
      >
        Search
      </button>
    </div>
  );
}

export default SearchAndFilter;
