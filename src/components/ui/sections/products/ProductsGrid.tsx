'use client'

import { useEffect, useState } from "react";
import { generateProductsDb } from "@/utils/generate-product-db";
import ProductCard from "./ProductCard";
import { IProduct } from "@/models/product";

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-10 w-full">
      {products?.map((product: IProduct, index: number) => (
        <ProductCard product={product} loading={loading} key={index} />
      ))}
    </div>
  )
}

ProductsGrid.displayName = 'ProductsGrid';

export default ProductsGrid;