'use client'
import { useEffect, useState } from "react";
import { Button, Badge } from "@/components/helpers/mt-exporter";
import { getCart } from "@/utils/cart";
import { FaCartShopping } from "react-icons/fa6";

export interface CartButtonProps {
  handleOpenDrawer: () => void;
}

const CartButton = (props: CartButtonProps) => {
  const { handleOpenDrawer } = props;
  const [cartLength, setCartLength] = useState<number>(0);

  useEffect(() => {
    const cart = getCart() || [];
    if (cart) {
      setCartLength(cart.length);
    }
  });

  return (
    <>
      <Badge content={cartLength} placement="bottom-end" color="indigo">
        <Button
          id="cart-button"
          variant="outlined"
          color="white"
          className="h-8"
          size="sm"
          onClick={handleOpenDrawer}
        >
          <FaCartShopping className="scale-125" />
        </Button>
      </Badge>
    </>
  )
}

CartButton.displayName = 'CartButton';

export default CartButton;