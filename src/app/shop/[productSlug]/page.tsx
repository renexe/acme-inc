'use client'
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { IProduct } from "@/models/product";
import { Typography, Button } from "@/components/helpers/mt-exporter";
import { FaCartShopping } from "react-icons/fa6";
import FavoriteButton from "@/components/ui/sections/products/FavoriteButton";

export default function Page({ params }: { params: { productSlug: string } }) {
  const slug = params.productSlug;
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

  return (
    <main className="flex items-start justify-between overflow-hidden pt-12">

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

      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[500px] min-h-[500px] border-white border p-10 flex flex-col gap-6 relative">
          <FavoriteButton />
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

          <Button
            variant="outlined"
            color="white"
            className="flex items-center justify-center gap-2 w-full"
            size="md"
          >
            <FaCartShopping /> Adicionar ao Carrinho
          </Button>
        </div>
      </div>

    </main>
  )
}

const Spacer = () => (
  <div className="flex-1 border border-white h-[1px]"></div>
)
