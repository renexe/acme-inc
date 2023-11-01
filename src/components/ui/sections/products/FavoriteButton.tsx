'use client'
import { Alert, Tooltip } from "@/components/helpers/mt-exporter";
import { IProduct } from "@/models/product";
import { isFavoriteProduct, isLoggedIn, removeFavoriteProduct, saveFavoriteProduct } from "@/utils/user";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";

export interface FavoriteButtonProps {
  product: IProduct;
}

const FavoriteButton = (
  props: FavoriteButtonProps
) => {
  const { product } = props;

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleFavoriteButton = () => {
    if (!isLogged) {
      setShowAlert(true);
      return;
    }
    if(isFavorite){
      removeFavoriteProduct(product);
    } else {
      saveFavoriteProduct(product);
    }
    setIsFavorite(!isFavorite);
  }

  useEffect(() => {
    if(isFavoriteProduct(product)){
      setIsFavorite(true);
    }
    if(isLoggedIn()){
      setIsLogged(true);
    }
  }, []);

  return (
    <>
      <Alert color="red" open={showAlert} onClose={() => setShowAlert(false)} className="z-20">
        Você precisa fazer login para favoritar um produto
      </Alert>
      {!showAlert && (
        <Tooltip content={isFavorite ? "Remover dos favoritos" : "Add aos favoritos"} placement="left">
          <button className="absolute top-0 right-0 z-20 p-4 group" onClick={handleFavoriteButton}>
            <FaHeart className={`${isFavorite ? 'text-indigo-500' : 'text-white'} scale-125 group-hover:scale-150 transition`} />
          </button>
        </Tooltip>
      )}
    </>
  )
}

FavoriteButton.displayName = 'FavoriteButton';

export default FavoriteButton;

const arr = [1, 2, 3, 4]
const max = Math.max.apply(null, arr);