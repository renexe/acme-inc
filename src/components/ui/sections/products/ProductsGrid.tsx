'use client'

import { useEffect, useState, useContext } from "react";
import { IProduct } from "@/models/product";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import { ProductsContext } from "@/providers/ProductsContext";
import { UserContext } from "@/providers/UserContext";

const ProductsGrid = () => {
  const { filteredProducts } = useContext(ProductsContext);
  const { favoriteProducts } = useContext(UserContext);
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
          <div key={index}>
            <ProductCard product={product} isFavorite={
              favoriteProducts.find((favProduct) => favProduct === product.slug)
                ? true
                : false
            } />
          </div>
        ))}
      </div>
    </>
  )
}

ProductsGrid.displayName = 'ProductsGrid';

export default ProductsGrid;