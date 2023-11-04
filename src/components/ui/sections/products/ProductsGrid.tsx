'use client'

import { useEffect, useState, useContext } from "react";
import { IProduct } from "@/models/product";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import { ProductsContext } from "@/providers/ProductsContext";

const ProductsGrid = () => {
  const { filteredProducts } = useContext(ProductsContext);
  const [products, setProducts] = useState<IProduct[] | []>([]);

  useEffect(() => {
    if (filteredProducts) {
      setProducts(filteredProducts);
    }
  }, [filteredProducts]);

  return (
    <>
      <FilterBar />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-10 w-full">
        {products?.map((product: IProduct, index: number) => (
          <ProductCard product={product} loading={false} key={index} />
        ))}
      </div>
    </>
  )
}

ProductsGrid.displayName = 'ProductsGrid';

export default ProductsGrid;