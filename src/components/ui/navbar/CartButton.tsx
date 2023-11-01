'use client'
import { Button, Badge } from "@/components/helpers/mt-exporter";
import { FaCartShopping } from "react-icons/fa6";

export interface CartButtonProps {
  itemsOnCart: number;
  handleOpenDrawer: () => void;
}

const CartButton = (props: CartButtonProps) => {
  const { handleOpenDrawer, itemsOnCart } = props;
  
  return (
    <>
      <Badge content={itemsOnCart} placement="bottom-end" color="indigo">
        <Button
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