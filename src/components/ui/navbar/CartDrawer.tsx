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
import { applyDiscount, priceWithDiscount } from "@/utils/cart";
import { useContext, useEffect, useState } from "react";
import { CardFooter } from "@material-tailwind/react";
import { CartContext } from "@/providers/CartContext";
import Image from "next/image";
import { UserContext } from "@/providers/UserContext";
import { AlertContext } from "@/providers/AlertContext";

const CartDrawer = () => {
  const { cart, emptyCart, drawerState, handleDrawerState, removeFromCart } = useContext(CartContext);
  const { loggedUser } = useContext(UserContext);
  const { registerAlert } = useContext(AlertContext);

  const [total, setTotal] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showCheckout, setShowCheckout] = useState<boolean>(false);

  useEffect(() => {
    calcTotal();
  }, [cart]);

  const calcTotal = () => {
    let storedTotal: string | number = cart.reduce((acc: number, product: IProduct) => {
      return acc + applyDiscount(product.price);
    }, 0);

    storedTotal = storedTotal.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setTotal(storedTotal);
  }

  const handleRemove = (product: IProduct) => {
    removeFromCart(product);
  }

  const checkout = () => {
    if (!loggedUser) {
      registerAlert(
        'Faça login para concluir a compra',
        'error'
      );
      return;
    }
    setShowCheckout(true);
    handleDrawerState();
  }

  const handleCheckoutDialog = () => {
    setShowCheckout(!showCheckout);
    emptyCart();
  }

  const showJson = () => {
    const cartData = {
      loggedUser: loggedUser,
      discount: '15%',
      products: cart.map((product: IProduct) => ({ name: product.name, price: priceWithDiscount(product.price) })),
      total: total
    }
    alert(JSON.stringify(cartData));
  }

  return (
    <>
      <Drawer open={drawerState} onClose={handleDrawerState} placement="right">
        <div className="p-4 w-full h-full">
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Carrinho
            </Typography>
            <IconButton variant="text" color="blue-gray" onClick={handleDrawerState}>
              <FaX />
            </IconButton>
          </div>
          <div className="flex flex-col bg-white">
            {cart.length > 0 ? (
              <>
                {cart?.map((product: IProduct, index: number) => (
                  <div className="py-4 border-b border-gray-200" key={index}>
                    <div className="flex items-center gap-4 justify-between">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={64}
                        height={64}
                        objectFit="cover"
                      />
                      <div className="flex flex-col w-full">
                        <Typography variant="h6" color="gray">
                          {product.name}
                        </Typography>
                        <Typography color="gray">
                          {priceWithDiscount(product.price)} <span className="text-red-500 text-xs">-15%</span>
                        </Typography>
                      </div>
                      <Tooltip content="Remover" placement="top" className="z-[9999]">
                        <IconButton variant="text" color="blue-gray" className="group" onClick={() => handleRemove(product)}>
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
              <Typography variant="paragraph" color="blue-gray">
                {loggedUser?.name}
              </Typography>
              <Typography variant="paragraph" color="blue-gray">
                {loggedUser?.phone}
              </Typography>
              <Typography variant="paragraph" color="blue-gray">
                {loggedUser?.email}
              </Typography>
            </div>
            <div className="w-full border border-black p-2">
              <Typography variant="h5" color="blue-gray">
                Produtos:
              </Typography>
              {cart?.map((product: IProduct, index: number) => (
                <div key={index} className="flex justify-between">
                  <Typography variant="h6" color="gray">
                    {product.name}
                  </Typography>
                  <Typography color="gray">
                    {priceWithDiscount(product.price)}
                  </Typography>
                </div>
              ))}
              <div className="flex justify-between mt-4">
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