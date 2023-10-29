import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

export interface IProduct {
  name: string;
  description?: string;
  price: string;
  image: string;
}

const ProductCard = (product: IProduct) => {
  const { name, price, image } = product;

  return (
    <div className="w-full flex flex-col items-center justify-center relative min-h-[400px] overflow-hidden">
      <FavoriteButton />
      <Link href={`/shop/${name}`} className="group w-full">
        <Image
          src={image}
          alt={name}
          fill
          objectFit="cover"
          className="group-hover:scale-110 transition"
        />
        <div className="absolute z-20 bottom-0 w-full h-1/3 p-4 bg-black/50 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <p className="text-lg font-bold text-white">{price}</p>
        </div>
      </Link>
    </div>
  );
}

ProductCard.displayName = "ProductCard";

export default ProductCard;