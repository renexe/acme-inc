'use client';

import {
  Typography,
  IconButton,
  Drawer,
  Tooltip,
  Button,
  Alert,
  Dialog,
  Card,
  CardBody,
} from "@/components/helpers/mt-exporter";
import { FaTrashCan, FaX } from "react-icons/fa6";
import { IProduct } from "@/models/product";
import { getCart, priceWithDiscount, removeFromCart, totalCart } from "@/utils/cart";
import { useEffect, useState } from "react";
import { getLoggedInUser, isLoggedIn } from "@/utils/user";
import { IUser } from "@/models/user";
import { CardFooter } from "@material-tailwind/react";

export interface CartDrawerProps {
  handleOpenDrawer: () => void;
  openDrawer: boolean;
}

const CartDrawer = (props: CartDrawerProps) => {
  const { openDrawer, handleOpenDrawer } = props;
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [total, setTotal] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const cart = getCart() || [];
    setProducts(cart);
    setTotal(totalCart());
  });

  const handleRemove = (index: number) => {
    const cart = getCart() || [];
    removeFromCart(index);
    setTotal(totalCart());
    setProducts(cart);
  }

  const checkout = () => {
    if (!isLoggedIn()) {
      setShowAlert(true);
      return;
    }
    const loggedUser = getLoggedInUser();
    setUser(loggedUser as IUser);
    setShowCheckout(true);
    handleOpenDrawer();
  }

  const handleCheckoutDialog = () => {
    setShowCheckout(!showCheckout);
  }

  const showJson = () => {
    const cartData = {
      user: user,
      discount: '15%',
      products: products.map((product: IProduct) => ({ name: product.name, price: priceWithDiscount(product.price) })),
      total: total
    }
    alert(JSON.stringify(cartData));
  }

  return (
    <>
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
                  <div className="flex items-center justify-between py-4 border-b border-gray-200" key={index}>
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
                <Alert color="red" open={showAlert} onClose={() => setShowAlert(false)} className="z-20">
                  Faça login para concluir a compra
                </Alert>
                <div className="flex items-center justify-between mt-6 border-b border-gray-200">
                  <Button variant="filled" className="w-full" onClick={checkout}>CONCLUIR A COMPRA</Button>
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

      <Dialog
        size="sm"
        open={showCheckout}
        handler={handleCheckoutDialog}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h5" color="blue-gray">
              Parabéns! Você comprou com sucesso.
            </Typography>
            <Typography variant="h6" color="blue-gray">
              Segue os dados da sua compra:
            </Typography>
            <div className="w-full border border-black p-2">
              <Typography variant="h5" color="blue-gray">
                Dados pessoais:
              </Typography>
              <Typography variant="h6" color="blue-gray">
                {user?.name}
              </Typography>
              <Typography variant="h6" color="blue-gray">
                {user?.phone}
              </Typography>
              <Typography variant="h6" color="blue-gray">
                {user?.email}
              </Typography>
            </div>
            <div className="w-full border border-black p-2">
              <Typography variant="h5" color="blue-gray">
                Produtos:
              </Typography>
              {products?.map((product: IProduct, index: number) => (
                <div key={index} className="flex justify-between">
                  <Typography variant="h6" color="gray">
                    {product.name}
                  </Typography>
                  <Typography color="gray">
                    {priceWithDiscount(product.price)}
                  </Typography>
                </div>
              ))}
              <div className="flex justify-between">
                <Typography variant="h5" color="black">
                  Total
                </Typography>
                <Typography variant="h5" color="black">
                  {total}
                </Typography>
              </div>
            </div>
          </CardBody>
          <CardFooter className="flex flex-col gap-4">
            <Button variant="gradient" className="w-full" onClick={showJson}>Mostrar JSON</Button>
            <Button variant="gradient" className="w-full" onClick={handleCheckoutDialog}>Fechar</Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

CartDrawer.displayName = 'CartDrawer';

export default CartDrawer;