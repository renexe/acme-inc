'use client'
import { Tooltip } from "@/components/helpers/mt-exporter";
import { IProduct } from "@/models/product";
import { AlertContext } from "@/providers/AlertContext";
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
  const { loggedUser, addFavoriteProduct, removeFavoriteProduct } = useContext(UserContext);

  const { product } = props;

  const isLoggedUserFavorite = loggedUser?.favorites?.find((favProduct) => favProduct === product.slug);
  const [isFavorite, setIsFavorite] = useState<boolean>(isLoggedUserFavorite ? true : false);

  const handleFavoriteButton = () => {
    if (!loggedUser) {
      registerAlert('Você precisa fazer login para favoritar um produto', 'error');
      setIsFavorite(false);
      return;
    }
    if (isFavorite) {
      removeFavoriteProduct(product.slug as string);
      setIsFavorite(false);
    } else {
      addFavoriteProduct(product.slug as string);
      setIsFavorite(true);
    }
  }

  return (
    <Tooltip content={isFavorite ? "Remover dos favoritos" : "Add aos favoritos"} placement="left">
      <button className="absolute top-0 right-0 z-20 p-4 group" onClick={handleFavoriteButton}>
        <FaHeart className={`${isFavorite ? 'text-indigo-500' : 'text-white'} scale-125 group-hover:scale-150 transition`} />
      </button>
    </Tooltip>
  )
}

FavoriteButton.displayName = 'FavoriteButton';

export default FavoriteButton;