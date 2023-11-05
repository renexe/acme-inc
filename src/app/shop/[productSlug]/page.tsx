'use client'
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { IProduct } from "@/models/product";
import { Typography, Tooltip } from "@/components/helpers/mt-exporter";
import { FaHeart } from "react-icons/fa6";
import AddToCartButton from "@/components/ui/buttons/AddToCartButton";
import { UserContext } from "@/providers/UserContext";

export default function Page({ params }: { params: { productSlug: string } }) {
  const slug = params.productSlug;
  const { favoriteProducts, handleFavoriteProduct } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const [product, setProduct] = useState<IProduct | undefined>();
  const [totalPrice, setTotalPrice] = useState<string>('00,00');
  const [discount, setDiscount] = useState<string>('00,00');

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      const currentProduct = parsedProducts.filter((product: IProduct) => product.slug === slug);
      if (currentProduct.length > 0) {
        const discount = (currentProduct[0].price * 0.15);
        setDiscount(discount.toFixed(2).replace('.', ','));
        setTotalPrice((currentProduct[0].price - discount).toFixed(2).replace('.', ','))
        setProduct(currentProduct[0]);
      } else {
        notFound();
      }
    }
  }, []);

  useEffect(() => {
    if (product) {
      setIsFavorite(favoriteProducts.includes(product.slug as string));
    }
  }, [favoriteProducts, product]);

  const handleFavoriteButton = () => {
    setIsFavorite(!isFavorite);
    handleFavoriteProduct(slug as string);
  }

  return (
    <main className="flex flex-col md:flex-row items-start md:justify-between md:overflow-hidden md:pt-12">

      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[500px] h-[500px] relative">
          {product?.image && (
            <Image
              src={product?.image}
              alt={product?.name}
              fill
              objectFit="cover"
            />
          )}
        </div>
      </div>

      <div className="w-full h-full flex justify-center items-center mt-6 md:mt-0">
        <div className="w-full mx-4 md:mx-0 md:w-[500px] min-h-[500px] border-white border p-10 flex flex-col gap-6 relative">
          {product && (
            <Tooltip content={isFavorite ? "Remover dos favoritos" : "Add aos favoritos"} placement="left">
              <button className="absolute top-0 right-0 z-20 p-4 group" onClick={handleFavoriteButton}>
                <FaHeart className={`${isFavorite ? 'text-indigo-500' : 'text-white'} scale-125 group-hover:scale-150 transition`} />
              </button>
            </Tooltip>
          )}
          <Typography color="white" className="text-2xl font-semibold">{product?.name}</Typography>
          <Typography color="white" className="text-sm">{product?.description}</Typography>

          <div className="flex justify-between gap-4 items-center">
            <Typography color="white" className="text-md font-semibold">Valor do produto</Typography>
            <Spacer />
            <Typography color="white" className="text-md font-semibold">R$ {product?.price.toFixed(2).replace('.', ',')}</Typography>
          </div>
          <div className="flex justify-between gap-4 items-center">
            <Typography color="white" className="text-md font-semibold">Desconto 15%</Typography>
            <Spacer />
            <Typography color="white" className="text-md font-semibold">R$ {discount}</Typography>
          </div>
          <div className="flex justify-between gap-4 items-center">
            <Typography color="white" className="text-md font-semibold">Valor do frete</Typography>
            <Spacer />
            <Typography color="white" className="text-md font-semibold">R$ 00,00</Typography>
          </div>
          <div className="flex justify-between gap-4 items-center">
            <Typography color="white" className="text-xl font-semibold">Total</Typography>
            <Spacer />
            <Typography color="white" className="text-xl font-semibold">R$ {totalPrice}</Typography>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>

    </main>
  )
}

const Spacer = () => (
  <div className="flex-1 border border-white h-[1px]"></div>
)
