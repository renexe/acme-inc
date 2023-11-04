
import ProductsGrid from "./ProductsGrid";

const ProductListingSection = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-8 px-8 sm:px-none container min-h-screen">
      <h2 className="text-2xl font-bold">Catálogo de produtos</h2>
      <ProductsGrid />
    </section>
  )
}

ProductListingSection.displayName = "ProductListingSection";

export default ProductListingSection;