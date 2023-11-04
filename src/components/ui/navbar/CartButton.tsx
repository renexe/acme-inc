'use client'
import { useContext, useEffect, useState } from "react";
import { Button, Badge } from "@/components/helpers/mt-exporter";
import { FaCartShopping } from "react-icons/fa6";
import { CartContext } from "@/providers/CartContext";

export interface CartButtonProps {
  handleOpenDrawer: () => void;
}

const CartButton = (props: CartButtonProps) => {
  const { cart, handleDrawerState } = useContext(CartContext);
  const [cartLength, setCartLength] = useState<number>(0);

  useEffect(() => {
    setCartLength(cart.length);
  },[cart]);

  return (
    <>
      <Badge content={cartLength} placement="bottom-end" color="indigo">
        <Button
          id="cart-button"
          variant="outlined"
          color="white"
          className="h-8"
          size="sm"
          onClick={handleDrawerState}
        >
          <FaCartShopping className="scale-125" />
        </Button>
      </Badge>
    </>
  )
}

CartButton.displayName = 'CartButton';

export default CartButton;