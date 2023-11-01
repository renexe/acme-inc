'use client';

import {
  Typography,
  IconButton,
  Drawer,
  Tooltip
} from "@/components/helpers/mt-exporter";
import { FaTrashCan, FaX } from "react-icons/fa6";
import { IProduct } from "@/models/product";
import { getCart, priceWithDiscount, removeFromCart, totalCart } from "@/utils/cart";
import { useEffect, useState } from "react";

export interface CartDrawerProps {
  handleOpenDrawer: () => void;
  openDrawer: boolean;
}

const CartDrawer = (props: CartDrawerProps) => {
  const { openDrawer, handleOpenDrawer } = props;
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [total, setTotal] = useState<string>('');

  useEffect(() => {
    setProducts(getCart());
    setTotal(totalCart());
  }, [localStorage.getItem("cart")]);

  const handleRemove = (index: number) => {
    removeFromCart(index);
    setTotal(totalCart());
    setProducts(getCart());
  }

  return (
    <Drawer open={openDrawer} onClose={handleOpenDrawer} placement="right">
      <div className="p-4 w-full h-full">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Carrinho
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={handleOpenDrawer}>
            <FaX />
          </IconButton>
        </div>
        <div className="flex flex-col bg-white">
          {products.length > 0 ? (
            <>
              {products?.map((product: IProduct, index: number) => (
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                    <div className="flex flex-col w-full">
                      <Typography variant="h6" color="gray">
                        {product.name}
                      </Typography>
                      <Typography color="gray">
                        {priceWithDiscount(product.price)} <span className="text-red-500 text-xs">-15%</span>
                      </Typography>
                    </div>
                    <Tooltip content="Remover" placement="top" className="z-[9999]">
                      <IconButton variant="text" color="blue-gray" className="group" onClick={() => handleRemove(index)}>
                        <FaTrashCan className="group-hover:text-red-500" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <Typography variant="h6" color="gray">
                  Total
                </Typography>
                <Typography color="gray">
                  {total}
                </Typography>
              </div>
            </>
          ) : (
            <Typography variant="h6" color="gray">
              O carrinho está vazio
            </Typography>
          )}
        </div>
      </div>
    </Drawer>
  );
}

CartDrawer.displayName = 'CartDrawer';

export default CartDrawer;