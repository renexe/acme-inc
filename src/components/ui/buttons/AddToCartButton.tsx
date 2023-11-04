'use client';

import { useContext } from "react";
import { IProduct } from "@/models/product";
import { CartContext } from "@/providers/CartContext";
import { Button } from "@/components/helpers/mt-exporter";
import { FaCartShopping } from "react-icons/fa6";

export interface AddToCartButtonProps {
  product?: IProduct;
}

const AddToCartButton = (props: AddToCartButtonProps) => {
  const { product } = props;
  const { cart, addToCart } = useContext(CartContext);

  const isProductInCart = cart.filter((item) => item.slug === product?.slug).length > 0;

  return (
    <Button
      variant="outlined"
      color="white"
      className="flex items-center justify-center gap-2 w-full"
      size="md"
      disabled={isProductInCart}
      onClick={() => addToCart(product as IProduct)}
    >
      <FaCartShopping /> {isProductInCart ? 'O produto já está no carrinho' : 'Adicionar ao Carrinho'}
    </Button>
  );
}

AddToCartButton.displayName = 'AddToCartButton';

export default AddToCartButton;