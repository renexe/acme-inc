'use client';
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/models/product";
import { useContext } from "react";
import { Tooltip } from "@material-tailwind/react";
import { FaHeart } from "react-icons/fa6";
import { UserContext } from "@/providers/UserContext";


interface ProductCardProps {
  product: IProduct;
  isFavorite: boolean;
}

const ProductCard = ({ product, isFavorite }: ProductCardProps) => {
  const { name, slug, price, image } = product;

  const {  handleFavoriteProduct } = useContext(UserContext);

  const handleFavoriteButton = () => {
    handleFavoriteProduct(slug as string);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center relative min-h-[400px] overflow-hidden">
      <Tooltip content={isFavorite ? "Remover dos favoritos" : "Add aos favoritos"} placement="left">
        <button className="absolute top-0 right-0 z-20 p-4 group" onClick={handleFavoriteButton}>
          <FaHeart className={`${isFavorite ? 'text-indigo-500' : 'text-white'} scale-125 group-hover:scale-150 transition`} />
        </button>
      </Tooltip>

      <Link href={`/shop/${slug}`} className="group w-full h-full">
        <>
          <Image
            src={image}
            alt={name}
            fill
            objectFit="cover"
            className="group-hover:scale-110 transition"
          />
          <div className="absolute z-20 bottom-0 w-full h-1/3 p-4 bg-black/50 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-lg font-bold text-white">R$ {price.toFixed(2).replace('.', ',')}</p>
          </div>
        </>
      </Link>
    </div >
  );
}

ProductCard.displayName = "ProductCard";

export default ProductCard;