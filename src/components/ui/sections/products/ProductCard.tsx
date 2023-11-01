import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/models/product";
import FavoriteButton from "./FavoriteButton";
import { useState } from "react";

interface ProductCardProps {
  product: IProduct;
  loading: boolean;
}

const ProductCard = ({ product, loading }: ProductCardProps) => {
  const { name, slug, price, image } = product;

  return (
    <div className="w-full flex flex-col items-center justify-center relative min-h-[400px] overflow-hidden">
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          <FavoriteButton product={product} />
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
        </>
      )
      }
    </div >
  );
}

ProductCard.displayName = "ProductCard";

export default ProductCard;