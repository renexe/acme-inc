import { Button } from "@/components/helpers/mt-exporter";

const FilterBar = () => {

  return (
    <div className="flex w-full h-10">
      <Button
        color="white"
        variant="text"
        size="sm"
      >Filtrar</Button>
    </div>
  );
};

FilterBar.displayName = "FilterBar";

export default FilterBar;