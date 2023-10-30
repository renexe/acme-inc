'use client'

import { useEffect, useState } from "react";
import { IProduct } from "@/models/product";
import { generateProductsDb } from "@/utils/generate-product-db";
import ProductCard from "./ProductCard";
import FilterBar, { E_FILTERS, FILTERS } from "./FilterBar";
import { sortProducts } from "@/utils/sort";

const ProductsGrid = () => {
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProducts(sortProducts(parsedProducts, FILTERS[0]));
    } else {
      setLoading(true);
      getProducts();
    }
  }, [loading]);

  const getProducts = async () => {
    const generatedProducts = await generateProductsDb();
    localStorage.setItem("products", JSON.stringify(generatedProducts));
    setProducts(sortProducts(generatedProducts, FILTERS[0]));
    setLoading(false);
  }

  const filterProducts = (filter: E_FILTERS) => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      const sortedProducts = sortProducts(parsedProducts, filter);
      setProducts(sortedProducts);
    }
  }

  return (
    <>

      <FilterBar filterCallback={filterProducts} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-10 w-full">
        {products?.map((product: IProduct, index: number) => (
          <ProductCard product={product} loading={loading} key={index} />
        ))}
      </div>
    </>
  )
}

ProductsGrid.displayName = 'ProductsGrid';

export default ProductsGrid;