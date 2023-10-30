'use client'

import { useEffect, useState } from "react";
import { IProduct } from "@/models/product";
import { generateProductsDb } from "@/utils/generate-product-db";
import ProductCard from "./ProductCard";
import FilterBar, { E_FILTERS } from "./FilterBar";

const ProductsGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    } else {
      setLoading(true);
      getProducts();
    }
    console.log(storedProducts);
  }, [loading]);

  const getProducts = async () => {
    const generatedProducts = await generateProductsDb();
    localStorage.setItem("products", JSON.stringify(generatedProducts));
    setProducts(generatedProducts);
    setLoading(false);
  }

  const filterProducts = (filter: E_FILTERS) => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      const filteredProducts = parsedProducts.sort((a: IProduct, b: IProduct) => {
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
      setProducts(filteredProducts);
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