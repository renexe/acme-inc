'use client'

import { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@/components/helpers/mt-exporter";
import CartButton from "./CartButton";
import CartDrawer from "./CartDrawer";
import SignInButton from "./SignInButton";

const StickyNavbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [openCartDrawer, setOpenCartDrawer] = useState<boolean>(false);

  const handleOpenDrawer = () => {
    setOpenCartDrawer(!openCartDrawer);
  }

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 720 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6">
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Produtos
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Sobre nós
        </a>
      </Typography>

    </ul>
  );

  return (
    <>
      <Navbar className={`bg-black/50 border-black/70 sticky top-0 z-50 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4`}>
        <div className="flex items-center justify-between text-white">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-semibold text-xl tracking-tight leading-tight"
          >
            Acme.Inc
          </Typography>
          <div className="flex items-center gap-4">

            <div className="mr-4 hidden md:block">{navList}</div>

            <CartButton handleOpenDrawer={handleOpenDrawer} />

            <div className="flex items-center gap-x-1">
              <SignInButton />
            </div>

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
        </Collapse>
      </Navbar>

      <CartDrawer />
    </>
  );
}

StickyNavbar.displayName = "StickyNavbar";

export default StickyNavbar;