import { E_FILTERS } from "@/components/ui/sections/products/FilterBar";
import { IProduct } from "@/models/product";

export function sortProducts(
  products: IProduct[],
  filter: E_FILTERS
): IProduct[] {

  const sorted = products.sort((a: IProduct, b: IProduct) => {
    if (filter.name === "Nome ASC") {
      return a.name.localeCompare(b.name);
    }
    if (filter.name === "Nome DSC") {
      return b.name.localeCompare(a.name);
    }
    if (filter.name === "Preço ASC") {
      return a.price - b.price;
    }
    if (filter.name === "Preço DSC") {
      return b.price - a.price;
    }
    return 0;
  });
  
  return sorted;
}
