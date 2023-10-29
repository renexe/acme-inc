import Hero from "@/components/ui/hero/Hero";
import ProductListingSection from "@/components/ui/sections/products/ProductListingSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <ProductListingSection />
    </main>
  )
}
