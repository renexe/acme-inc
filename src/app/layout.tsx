import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/helpers/mt-exporter";
import { CartContextProvider } from '@/providers/CartContext';
import { UserContextProvider } from '@/providers/UserContext';
import { AlertContextProvider } from '@/providers/AlertContext';
import { ProductsContextProvider } from '@/providers/ProductsContext';
import Navbar from "@/components/ui/navbar/StickyNavbar";
import './globals.css'
import UserDialog from '@/components/ui/dialogs/UserDialog';
import Alert from '@/components/ui/alert/Alert';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Acme inc.',
  description: 'Evolução em design e tecnologia.',
}

const theme = {
  drawer: {
    defaultProps: {
      size: 300,
      overlay: true,
      placement: "left",
      overlayProps: undefined,
      className: "",
      dismiss: undefined,
      onClose: undefined,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    styles: {
      base: {
        drawer: {
          position: "fixed",
          zIndex: "z-[9999]",
          pointerEvents: "pointer-events-auto",
          backgroundColor: "bg-white",
          boxSizing: "box-border",
          width: "w-full",
          boxShadow: "shadow-2xl shadow-blue-gray-900/10",
        },
        overlay: {
          position: "fixed",
          inset: "inset-0",
          width: "w-full",
          height: "h-full",
          pointerEvents: "pointer-events-auto",
          zIndex: "z-[9995]",
          backgroundColor: "bg-black",
          backgroundOpacity: "bg-opacity-60",
          backdropBlur: "backdrop-blur-sm",
        },
      },
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ThemeProvider value={theme}>
      <AlertContextProvider>
        <UserContextProvider>
          <ProductsContextProvider>
            <CartContextProvider>
              <html lang="en">
                <body className={`${inter.className} overflow-x-hidden`}>
                  <Navbar />
                  <Alert />
                  <UserDialog />
                  {children}
                </body>
              </html>
            </CartContextProvider>
          </ProductsContextProvider>
        </UserContextProvider>
      </AlertContextProvider>
    </ThemeProvider>
  )
}
