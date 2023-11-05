'use client'
import { Tooltip } from "@/components/helpers/mt-exporter";
import { IProduct } from "@/models/product";
import { AlertContext } from "@/providers/AlertContext";
import { ProductsContext } from "@/providers/ProductsContext";
import { UserContext } from "@/providers/UserContext";
import { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";

export interface FavoriteButtonProps {
  product: IProduct;
}

const FavoriteButton = (
  props: FavoriteButtonProps
) => {
  const { registerAlert } = useContext(AlertContext);
  const { filteredBy } = useContext(ProductsContext)
  const { loggedUser, handleFavoriteProduct, favoriteProducts } = useContext(UserContext);

  const { product } = props;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const isUserFavorite = favoriteProducts.find((favProduct) => favProduct === product.slug);
    if (isUserFavorite) {
      console.log(favoriteProducts, isUserFavorite);
      setIsFavorite(true);
    }
  }, [favoriteProducts, ]);



  // useEffect(() => {
  //   if(filteredBy === 'favorites') {
  //     return;
  //   }
  //   const isLoggedUserFavorite = loggedUser?.favorites.find((favProduct) => favProduct === product.slug);
  //   if (isLoggedUserFavorite) {
  //     setIsFavorite(true);
  //   } else {
  //     setIsFavorite(false);
  //   }
  // }, [loggedUser, filteredBy]);

  // const handleFavoriteButton = () => {
  //   if (!loggedUser) {
  //     registerAlert('Você precisa fazer login para favoritar um produto', 'error');
  //     setIsFavorite(false);
  //     return;
  //   }
  //   handleFavoriteProduct(product.slug as string);
  //   setIsFavorite(false);
  // }

  return (
    <Tooltip content={isFavorite ? "Remover dos favoritos" : "Add aos favoritos"} placement="left">
      <button className="absolute top-0 right-0 z-20 p-4 group" onClick={() => handleFavoriteProduct(product.slug as string)}>
        <FaHeart className={`${isFavorite ? 'text-indigo-500' : 'text-white'} scale-125 group-hover:scale-150 transition`} />
      </button>
    </Tooltip>
  )
}

FavoriteButton.displayName = 'FavoriteButton';

export default FavoriteButton;