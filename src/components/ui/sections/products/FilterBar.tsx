'use client'
import { useState } from "react";
import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@/components/helpers/mt-exporter";
import { Button } from "@/components/helpers/mt-exporter";
import { FaArrowUpAZ, FaArrowDownAZ, FaArrowUp19, FaArrowDown19, FaHeart } from "react-icons/fa6";

export const FILTERS = [
  {
    name: "Nome ASC",
    icon: <FaArrowUpAZ />
  },
  {
    name: "Nome DSC",
    icon: <FaArrowDownAZ />
  },
  {
    name: "Preço ASC",
    icon: <FaArrowUp19 />
  },
  {
    name: "Preço DSC",
    icon: <FaArrowDown19 />
  },
]

export type E_FILTERS = typeof FILTERS[number];

export interface FilterBarProps {
  filterCallback: (filter: E_FILTERS) => void;
  searchCallback: (input: string) => void;
}

const FilterBar = (
  props: FilterBarProps
) => {
  const { filterCallback, searchCallback } = props;

  const [currentFilter, setCurrentFilter] = useState<E_FILTERS>(FILTERS[0]);


  const handleFilter = (filter: E_FILTERS) => {
    setCurrentFilter(filter);
    filterCallback(filter);
  }

  return (
    <div className="w-full flex items-center h-10 justify-between">
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
            className="flex items-center justify-center gap-2 w-40 h-10"
            size="sm"
          >
            {currentFilter.icon} {currentFilter.name}
          </Button>
        </MenuHandler>
        <MenuList className="bg-black/50 backdrop-blur-md">
          {FILTERS.map((filter: E_FILTERS, index: number) => (
            <MenuItem
              className="text-white flex gap-2"
              key={index}
              onClick={() => handleFilter(filter)}
              disabled={filter === currentFilter}
            >
              {filter.icon} {filter.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <div className="flex justify-center w-2/4">
        <Input crossOrigin label="Buscar" color="white" onChange={(e) => searchCallback(e.target.value)} />
      </div>

      <Button
        variant="outlined"
        color="white"
        className="flex items-center justify-center gap-2 w-40 h-10"
        size="sm"
      >
        <FaHeart className="" /> Favoritos
      </Button>

    </div>
  );
};

FilterBar.displayName = "FilterBar";

export default FilterBar;