'use client';
import { IProduct } from '@/models/product';
import { generateProductsDb } from '@/utils/generate-product-db';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from './UserContext';

export type FilterType = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'favorites';

export interface ProductsContextProps {
  allProducts: IProduct[] | [];
  filteredProducts: IProduct[] | [];
  filteredBy: FilterType;
  handleFilterProducts: (filter: FilterType) => void;
  handleSearchProducts: (input: string) => void;
}

interface ProductsContextProviderProps {
  children: React.ReactNode
}

const INITIAL_STATE: ProductsContextProps = {
  allProducts: [],
  filteredProducts: [],
  filteredBy: 'name-asc',
  handleFilterProducts: () => { },
  handleSearchProducts: () => { },
}

export const ProductsContext = createContext<ProductsContextProps>(INITIAL_STATE);

export function ProductsContextProvider({ children }: ProductsContextProviderProps) {
  const { loggedUser, favoriteProducts, handleFavoriteProduct } = useContext(UserContext);

  const [allProducts, setAllProducts] = useState<IProduct[] | []>(INITIAL_STATE.allProducts);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[] | []>(INITIAL_STATE.filteredProducts);
  const [filteredBy, setFilteredBy] = useState<FilterType>(INITIAL_STATE.filteredBy);

  useEffect(() => {
    if(filteredBy === 'favorites') {
      handleFilterProducts('favorites');
    }
  },[handleFavoriteProduct])

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      const sortedProducts = parsedProducts.sort((a: IProduct, b: IProduct) => a.name.localeCompare(b.name));
      setAllProducts(sortedProducts);
      setFilteredProducts(sortedProducts);
      return;
    }
    generateProducts();
  }, []);

  const generateProducts = async () => {
    const generatedProducts = await generateProductsDb();
    localStorage.setItem("products", JSON.stringify(generatedProducts));
    const sortedProducts = generatedProducts.sort((a: IProduct, b: IProduct) => a.name.localeCompare(b.name));
    setAllProducts(sortedProducts);
    setFilteredProducts(sortedProducts);
  }

  const handleFilterProducts = (filter: FilterType) => {
    let sortedProducts: IProduct[] = [];
    switch (filter) {
      case 'name-asc':
        sortedProducts = allProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedProducts = allProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        sortedProducts = allProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts = allProducts.sort((a, b) => b.price - a.price);
        break;
      case 'favorites':
        if (!loggedUser) {
          break;
        }
        sortedProducts = allProducts.filter((product: IProduct) => favoriteProducts.includes(product.slug as string));
        break;
      default:
        sortedProducts = allProducts;
    }
    setFilteredBy(filter);
    setFilteredProducts(sortedProducts);
  }

  const handleSearchProducts = (input: string) => {
    if (input === "") {
      setFilteredProducts(allProducts);
      return;
    }
    const filteredProducts = allProducts.filter((product: IProduct) => product.name.toLowerCase().includes(input.toLowerCase()));
    setFilteredProducts(filteredProducts);
  }

  return (
    <ProductsContext.Provider value={{
      allProducts,
      filteredProducts,
      filteredBy,
      handleFilterProducts,
      handleSearchProducts,
    }}>
      {children}
    </ProductsContext.Provider>
  );
}