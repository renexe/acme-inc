'use client'
import { useContext, useState } from "react";
import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@/components/helpers/mt-exporter";
import { Button } from "@/components/helpers/mt-exporter";
import { FaArrowUpAZ, FaArrowDownAZ, FaArrowUp19, FaArrowDown19, FaHeart } from "react-icons/fa6";
import { FilterType, ProductsContext } from "@/providers/ProductsContext";

export const FILTERS = [
  {
    name: "Nome ASC",
    slug: "name-asc",
    icon: <FaArrowUpAZ />
  },
  {
    name: "Nome DESC",
    slug: "name-desc",
    icon: <FaArrowDownAZ />
  },
  {
    name: "Preço ASC",
    slug: "price-asc",
    icon: <FaArrowUp19 />
  },
  {
    name: "Preço DESC",
    slug: "price-desc",
    icon: <FaArrowDown19 />
  },
]

export type E_FILTERS = typeof FILTERS[number];

const FilterBar = () => {

  const { filteredBy, handleFilterProducts, handleSearchProducts } = useContext(ProductsContext);

  const [searchInputValue, setSearchInputValue] = useState<string>('');

  const handleFavoriteButton = () => {
    // filterFavoritesCallback();
  }

  const handleSearchInput = (value: string) => {
    setSearchInputValue(value);
    handleSearchProducts(value);
  }

  const findCurrentFilter = () => {
    const filter = FILTERS.find((filter: E_FILTERS) => filter.slug === filteredBy);
    if (filter) {
      return filter;
    }
    return FILTERS[0];
  }

  return (
    <div className="w-full flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:h-10 md:justify-between">
      <Menu
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        <MenuHandler>
          <Button
            variant="outlined"
            color="white"
            className="flex items-center justify-center gap-2 md:w-40 h-10 w-full"
            size="sm"
          >
            {findCurrentFilter().icon} {findCurrentFilter().name}
          </Button>
        </MenuHandler>
        <MenuList className="bg-black/50 backdrop-blur-md">
          {FILTERS.map((filter: E_FILTERS, index: number) => (
            <MenuItem
              className="text-white flex gap-2"
              key={index}
              onClick={() => handleFilterProducts(filter.slug as FilterType)}
              disabled={filter.slug === filteredBy}

            >
              {filter.icon} {filter.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <div className="flex justify-center w-full md:w-2/4">
        <Input crossOrigin label="Buscar" color="white" value={searchInputValue} onChange={(e) => handleSearchInput(e.target.value)} />
      </div>

      <Button
        variant="outlined"
        color={false ? "indigo" : "white"}
        className="flex items-center justify-center gap-2 w-full md:w-40 h-10"
        size="sm"
        onClick={handleFavoriteButton}
      >
        <FaHeart className="" /> Favoritos
      </Button>

    </div>
  );
};

FilterBar.displayName = "FilterBar";

export default FilterBar;