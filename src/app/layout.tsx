import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/helpers/mt-exporter";
import Navbar from "@/components/ui/navbar/StickyNavbar";
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Acme inc.',
  description: 'Evolução em design e tecnologia.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <ThemeProvider>
      <html lang="en">
        <body className={`${inter.className} overflow-x-hidden`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ThemeProvider>
  )
}
